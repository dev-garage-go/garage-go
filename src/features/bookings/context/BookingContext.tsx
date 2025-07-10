"use client"

import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react"
import { AppointmentDataInterface, BookingServiceDataInterface, UserInterface } from '@/features/bookings';
import { bookingKey } from "../keys/storage"
import { toast } from "sonner";

import { createBooking } from "@/backend/actions"

import { useVehicleContext } from "@/features/vehicle"
import { useServiceContext } from "@/features/services"
import { usePaymentContext } from "@/features/payment";

interface ServiceBookingType {
  getBookingIDInStorage: () => string
  setBookingIDInStorage: (id: string) => void,
  deleteBookingIDInStorage: () => void,
  createServiceBooking: (data: AppointmentDataInterface) => void,
  bookingCreated: boolean | null,
  creatingBookingAnimation: boolean
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
  const { serviceInStorage } = useServiceContext()
  const { amountInCookie } = usePaymentContext()

  const router = useRouter()

  // saves the successful or unsuccessful response of the backend when trying to create a booking
  const [bookingCreated, setBookingCreated] = useState<boolean | null>(null)

  // animates btn when the booking has been creating
  const [creatingBookingAnimation, setCreatingBookingAnimation] = useState<boolean>(false)

  const getBookingIDInStorage = (): string => {
    const id = localStorage.getItem(bookingKey)
    if (!id) throw new Error("booking id doesn't exist in local storage")
    return id
  }

  const setBookingIDInStorage = (id: string) => {
    localStorage.setItem(bookingKey, JSON.stringify(id))
  }

  const deleteBookingIDInStorage = () => {
    localStorage.removeItem(bookingKey)
  }

  const createServiceBooking = async (data: AppointmentDataInterface) => {
    if (!serviceInStorage || !vehicleInStorage) return;
    setCreatingBookingAnimation(true)

    const { user } = data;

    const userData: UserInterface = {
      name: user.name.toLowerCase(),
      lastName: user.lastName.toLowerCase(),
      email: user.email.toLowerCase(),
      address: user.address.toLowerCase(),
      phone: user.phone,
      typeAddress: user.typeAddress,
      additionalInfo: user.additionalInfo?.toLowerCase()
    }

    const booking: BookingServiceDataInterface = {
      service: serviceInStorage,
      appointment: data.appointment,
      vehicleID: vehicleInStorage._id,
      user: userData,
      amount: amountInCookie
    }

    const responseBooking = await createBooking(booking)

    if (!responseBooking.success) {
      setBookingCreated(false)
      toast.error('Ocurrio un error inesperado creando su reserva')
      throw new Error(responseBooking.error)
    }

    const newBooking = responseBooking.data
    if (!newBooking) throw new Error("error getting data of new booking");
    setCreatingBookingAnimation(false)

    // save the booking id in local storage and redirect
    setBookingIDInStorage(newBooking._id)
    router.push('/payment')
  }


  return <BookingContext.Provider
    value={{
      getBookingIDInStorage,
      setBookingIDInStorage,
      deleteBookingIDInStorage,
      createServiceBooking,
      bookingCreated,
      creatingBookingAnimation
    }}
  >
    {children}
  </BookingContext.Provider>
}