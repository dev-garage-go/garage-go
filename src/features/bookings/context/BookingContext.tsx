"use client"

import { createContext, useContext, useState } from "react"
import { AppointmentData, BookingServiceData } from "@/interfaces"

import { createBooking, getServiceAmount } from "@/backend/actions"

import { useVehicleContext } from "@/features/vehicle"
import { useServiceContext } from "@/features/services"
import { bookingKey } from "../keys/storage"



interface ServiceBookingType {
  setBookingInStorage: (data: any) => void
  createServiceBooking: (data: AppointmentData) => void,
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

  const setBookingInStorage = (data: AppointmentData) => {
    localStorage.setItem(bookingKey, JSON.stringify(data))
  }

  const createServiceBooking = async (data: AppointmentData) => {
    if (service && vehicle) {
      const amountService = await getServiceAmount(service)
      if (!amountService) return;

      const booking: BookingServiceData = {
        service: service,
        appointment: data.appointment,
        vehicle: vehicle,
        user: data.user,
        amount: amountService
      }

      try {
        const err = await createBooking(booking)
        if (!err.errorMessage) {
          // emailSent = await sendConfirmationEmail() -> Send email
          // if(emailSent.success) {
          setBookingCreated(true)
          // } else {}

          deleteServiceFromStorage()
        } else {
          setBookingCreated(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
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