"use client"

import { createContext, useContext, useState } from "react"
import { AppointmentDataInterface, BookingServiceDataInterface } from '@/features/bookings';
import { bookingKey } from "../keys/storage"

import { createBooking } from "@/backend/actions"

import { useVehicleContext } from "@/features/vehicle"
import { ServiceNamesMap, useServiceContext } from "@/features/services"
import { ConfirmationBookingEmailInterface, useEmailContext } from "@/features/emails"
import { usePaymentContext } from "@/features/payment";

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
  const { vehicleInStorage } = useVehicleContext()
  const { serviceInStorage, deleteServiceFromStorage } = useServiceContext()
  const { sendBookingConfirmationEmail } = useEmailContext()
  const { handleShowAmount } = usePaymentContext()

  const [bookingCreated, setBookingCreated] = useState<boolean | null>(null)

  const setBookingInStorage = (data: AppointmentDataInterface) => {
    localStorage.setItem(bookingKey, JSON.stringify(data))
  }

  const createServiceBooking = async (data: AppointmentDataInterface) => {
    if (!serviceInStorage || !vehicleInStorage) return;

    const booking: BookingServiceDataInterface = {
      service: serviceInStorage,
      appointment: data.appointment,
      vehicleID: vehicleInStorage._id,
      user: data.user,
      amount: handleShowAmount()
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

    // ! To prod
    // const emailDataProd: ConfirmationBookingEmailInterface = {
    //   bookingId: newBooking._id,
    //   firstName: newBooking.user.name,
    //   service: ServiceNamesMap[newBooking.service.name],
    //   userEmail: newBooking.user.email,
    // }

    // ! To testing
    const emailDataTest: ConfirmationBookingEmailInterface = {
      bookingId: newBooking._id,
      firstName: newBooking.user.name,
      service: ServiceNamesMap[newBooking.service.name],
      userEmail: "development@garageservice.cl",
    }

    const emailResponse = await sendBookingConfirmationEmail(emailDataTest)

    if (!emailResponse.ok) {
      setBookingCreated(false)
      throw new Error(`email API response with an error: ${emailResponse.status}`)
    }

    // show modal that confirm email sent and delete service from storage 
    setBookingCreated(true)
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