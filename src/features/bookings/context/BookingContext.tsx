"use client"

import { createContext, useContext, useState } from "react"
import { AppointmentDataInterface, BookingServiceDataInterface, UserInterface } from '@/features/bookings';
import { bookingKey } from "../keys/storage"

import { createBooking, deleteBaseAmountInCookie } from "@/backend/actions"

import { useVehicleContext } from "@/features/vehicle"
import { ServiceNamesMap, useServiceContext } from "@/features/services"
import { ConfirmationBookingEmailInterface, useEmailContext } from "@/features/emails"
import { usePaymentContext } from "@/features/payment";

interface ServiceBookingType {
  bookingCreated: boolean | null
  showConfirmModal: boolean
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>
  setBookingInStorage: (data: any) => void
  createServiceBooking: (data: AppointmentDataInterface) => void,
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
  const { sendBookingConfirmationEmail } = useEmailContext()
  const { amountInCookie } = usePaymentContext()

  // saves the successful or unsuccessful response of the backend when trying to create a booking
  const [bookingCreated, setBookingCreated] = useState<boolean | null>(null)

  // display modal in the ui confirming an error or a reservation successfully created and email sent
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)

  // animates btn when the booking has been creating
  const [creatingBookingAnimation, setCreatingBookingAnimation] = useState<boolean>(false)

  const setBookingInStorage = (data: AppointmentDataInterface) => {
    localStorage.setItem(bookingKey, JSON.stringify(data))
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
      throw new Error(responseBooking.error)
      // toast with error message
    }

    const newBooking = responseBooking.data
    if (!newBooking) throw new Error("error getting data of new booking");

    // Send confirmation booking email
    const isProd = process.env.NODE_ENV === "production";
    let emailData: ConfirmationBookingEmailInterface

    if (isProd) {
      emailData = {
        bookingId: newBooking._id,
        firstName: newBooking.user.name.toLowerCase(),
        service: ServiceNamesMap[newBooking.service.name],
        userEmail: newBooking.user.email.toLowerCase(),
      }
    } else {
      emailData = {
        bookingId: newBooking._id,
        firstName: newBooking.user.name.toLowerCase(),
        service: ServiceNamesMap[newBooking.service.name],
        userEmail: "development@garageservice.cl",
      }
    }

    const emailResponse = await sendBookingConfirmationEmail(emailData)

    if (!emailResponse.ok) {
      setBookingCreated(false)
      throw new Error(`email API response with an error: ${emailResponse.status}`)
    }

    setCreatingBookingAnimation(false)
    setBookingCreated(true) // show modal that confirm email sent and delete service from storage 
    setShowConfirmModal(true)

    // delete cookies when booking was created
    await deleteBaseAmountInCookie()
  }


  return <BookingContext.Provider
    value={{
      showConfirmModal,
      setShowConfirmModal,
      setBookingInStorage,
      createServiceBooking,
      bookingCreated,
      creatingBookingAnimation
    }}
  >
    {children}
  </BookingContext.Provider>
}