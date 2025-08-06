"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { createBooking } from "@/backend/actions"

import { UserAppointment, BookingInterface, UserInterface, bookingKey } from '@/features/bookings';
import { useVehicleContext } from "@/features/vehicle"
import { useServiceContext } from "@/features/services"

interface ServiceBookingType {
  getBookingIDInStorage: () => string | null
  setBookingIDInStorage: (id: string) => void,
  deleteBookingIDInStorage: () => void,
  createServiceBooking: (data: UserAppointment) => void,
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

  const router = useRouter()
  const pahtname = usePathname()

  const [bookingCreated, setBookingCreated] = useState<boolean | null>(null) // saves the successful or unsuccessful response of the backend when trying to create a booking
  const [creatingBookingAnimation, setCreatingBookingAnimation] = useState<boolean>(false) // animates btn when the booking has been creating

  const getBookingIDInStorage = (): string | null => {
    const id = localStorage.getItem(bookingKey)
    if (!id) return null
    return id
  }

  const setBookingIDInStorage = (id: string) => {
    localStorage.setItem(bookingKey, id)
  }

  const deleteBookingIDInStorage = () => {
    localStorage.removeItem(bookingKey)
  }

  const createServiceBooking = async (data: UserAppointment) => {
    if (!serviceInStorage || !vehicleInStorage) return;
    setCreatingBookingAnimation(true)

    const { user, appointment } = data;

    const userData: UserInterface = {
      name: user.name.toLowerCase(),
      lastName: user.lastName.toLowerCase(),
      email: user.email.toLowerCase(),
      address: user.address.toLowerCase(),
      phone: user.phone,
      typeAddress: user.typeAddress,
      additionalInfo: user.additionalInfo?.toLowerCase()
    }

    const bookingTTL = new Date(Date.now() + 1000 * 60 * 90).toISOString() // 1.30 h
    const booking: BookingInterface = {
      service: serviceInStorage,
      appointment: appointment,
      vehicle_id: vehicleInStorage._id,
      user: userData,
      created_at: new Date(Date.now()).toISOString(),
      expires_at: bookingTTL
    }

    const responseBooking = await createBooking(booking)

    if (!responseBooking.success) {
      setBookingCreated(false)
      toast.error(`Ocurrio un error inesperado creando su reserva: ${responseBooking.error}`)
      throw new Error(responseBooking.error)
    }

    const newBooking = responseBooking.data
    if (!newBooking) throw new Error("error getting data of new booking");
    setCreatingBookingAnimation(false)

    // save the booking id in local storage and redirect
    setBookingIDInStorage(newBooking._id)
    router.push('/payment')
  }

  // ! guard
  useEffect(() => {
    const hasId = getBookingIDInStorage()

    if (hasId && !(pahtname.startsWith('/booking') || pahtname.startsWith('/payment'))) {
      deleteBookingIDInStorage()
    }
  }, [pahtname])

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