"use client"

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ModalPortal } from "@/components";

import { LazyVehicleDataModal, useVehicleContext } from "@/features/vehicle";
import { PaymentSummary } from "@/features/payment";
import {
  BookingForm,
  AppointmentDataInterface,
  useBookingContext,
  ConfirmationBookingModal,
} from "@/features/bookings"

interface Props {
  withBooking: boolean
}

export const BookingFormWrapper = ({ withBooking }: Props) => {
  const methods = useForm<AppointmentDataInterface>({
    shouldFocusError: true,
    defaultValues: {
      user: {
        typeAddress: 'casa',
        additionalInfo: ''
      }
    }
  })

  const { vehicle, showModal } = useVehicleContext()
  const { createServiceBooking, bookingCreated } = useBookingContext()

  const [showConfirmModal, setShowConfirmModal] = useState(false)

  // Func that will be executed when form its submitted
  const onSubmit = async (data: AppointmentDataInterface) => {
    createServiceBooking(data)
    setShowConfirmModal(true)
  }

  return (
    <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
      {/* if vehicle data doesn't exist, the modal will be open, otherwise it will be closed */}
      {!vehicle &&
        <ModalPortal isOpen={showModal}>
          <LazyVehicleDataModal /> {/* the component is only imported if the conditions are met */}
        </ModalPortal>
      }
      {/* when the backend will responded if the booking is successfully created or not, show modal */}
      {typeof bookingCreated === 'boolean' && (
        <ModalPortal isOpen={showConfirmModal}>
          <ConfirmationBookingModal success={bookingCreated} />
        </ModalPortal>
      )}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
            <BookingForm withBooking={withBooking} />
            <PaymentSummary />
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
