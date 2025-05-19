"use client"

import { createContext, useContext } from "react"
import { bookingKey } from "@/keys"
import { BookingData, CheckoutFormData } from "@/interfaces"
import { useServiceContext } from "./ServiceContext"
import { useVehicleContext } from "./VehicleContext"
import { useGetVehicleOnChangeStorage } from "@/hooks"


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
export const ServiceContextProvider = ({ children }: Props) => {
  const vehicle = useGetVehicleOnChangeStorage()

  const setBookingInStorage = (data: BookingData) => {
    localStorage.setItem(bookingKey, JSON.stringify(data))
  }

  return <BookingContext.Provider
    value={{
      setBookingInStorage
    }}
  >
    {children}
  </BookingContext.Provider>
}