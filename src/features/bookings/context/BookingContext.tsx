"use client"

import { createContext, useContext, useState } from "react"
import { AppointmentDataInterface, BookingServiceDataInterface, AddressTypesData } from '@/features/bookings';

import { createBooking, getServiceAmount } from "@/backend/actions"

import { useVehicleContext } from "@/features/vehicle"
import { ServiceNamesMap, useServiceContext } from "@/features/services"
import { ConfirmationBookingEmailInterface } from "@/features/emails"
import { bookingKey } from "../keys/storage"

interface ServiceBookingType {
  setBookingInStorage: (data: any) => void
  createServiceBooking: (data: AppointmentDataInterface) => void,
  bookingCreated: boolean | null
}

interface Props {
  children: React.ReactNode
}

// Create context
const BookingContext = createContext<ServiceBookingType | null>(null)

// Custom hook to use context
export const useBookingContext = () => {
  const context = useContext(BookingContext)
  if (!context) { throw new Error('useServiceContext must be inside of a context') }
  return context
}

// Provider
export const BookingContextProvider = ({ children }: Props) => {
  const { getVehicleFromStorage } = useVehicleContext()
  const { getServiceFromStorage, deleteServiceFromStorage } = useServiceContext()

  const vehicle = getVehicleFromStorage()
  const service = getServiceFromStorage()

  const [bookingCreated, setBookingCreated] = useState<boolean | null>(null)

  const setBookingInStorage = (data: AppointmentDataInterface) => {
    localStorage.setItem(bookingKey, JSON.stringify(data))
  }

  const createServiceBooking = async (data: AppointmentDataInterface) => {
    if (!service || !vehicle) return;
    
    const amountService = await getServiceAmount(service)
    if (!amountService) return;

    const booking: BookingServiceDataInterface = {
      service,
      appointment: data.appointment,
      vehicleID: vehicle._id,
      user: data.user,
      amount: amountService
    }

    const responseBooking = await createBooking(booking)

    if (!responseBooking.success) {
      setBookingCreated(false)
      throw new Error(responseBooking.error)
      // toast with error message
    }

    const newBooking = responseBooking.data
    if (!newBooking) throw new Error("error getting data of new booking")

    // Send confirmation booking email
    const emailData: ConfirmationBookingEmailInterface = {
      bookingId: newBooking._id!.toString(),
      firstName: newBooking.user.name,
      service: ServiceNamesMap[newBooking.service.name],
      userEmail: newBooking.user.email,
    }

    const emailSent = async () => {
      const response = await fetch("/api/emails/send", {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(emailData),
      })

      const data = await response.json()
      console.log(data)

      if (!response.ok) {
        setBookingCreated(false)
        throw new Error(`email api response with an error: ${response.status}`)
      }

      setBookingCreated(true)
      deleteServiceFromStorage()
    }

    await emailSent()
  }


  return <BookingContext.Provider
    value={{
      setBookingInStorage,
      createServiceBooking,
      bookingCreated
    }}
  >
    {children}
  </BookingContext.Provider>
}