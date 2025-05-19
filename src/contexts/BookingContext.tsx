"use client"

import { createContext, useContext } from "react"
import { bookingKey } from "@/keys"
import { AppointmentData } from "@/interfaces"
import { useVehicleContext } from "./VehicleContext"
import { useServiceContext } from "./ServiceContext"


interface ServiceBookingType {
  setBookingInStorage: (data: any) => void
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
  const { getServiceFromStorage } = useServiceContext()

  const vehicle = getVehicleFromStorage()
  const service = getServiceFromStorage()

  const setBookingInStorage = (data: AppointmentData) => {
    localStorage.setItem(bookingKey, JSON.stringify(data))
  }

  const createBooking = (data: AppointmentData) => {
  }

  return <BookingContext.Provider
    value={{
      setBookingInStorage
    }}
  >
    {children}
  </BookingContext.Provider>
}