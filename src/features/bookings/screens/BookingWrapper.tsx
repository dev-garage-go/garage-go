"use client"

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { ModalPortal } from "@/components";
import { LazyVehicleDataModal, useVehicleContext, VehicleDataModal } from "@/features/vehicle";
import {
  BookingForm,
  AppointmentDataInterface,
  BookingSummary,
  useBookingContext,
  ConfirmationBookingModal,
} from "@/features/bookings"
import { sleep } from "@/utils";


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

  // TODO: action/calcAmountByService(service: string, data: {})
  const { vehicle, showModal, setShowModal } = useVehicleContext()
  const { createServiceBooking, bookingCreated } = useBookingContext()

  const [showConfirmModal, setShowConfirmModal] = useState(false)

  // Func that will be executed when form its submitted
  const onSubmit = async (data: AppointmentDataInterface) => {
    console.log(data)
    createServiceBooking(data)

    setShowConfirmModal(true)
    await sleep(2000)
    setShowConfirmModal(false)
  }

  return (
    <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
      {/* if vehicle data doesn't exist, the modal will be open, otherwise it will be closed */}
      {!vehicle &&
        <ModalPortal isOpen={showModal}>
          <LazyVehicleDataModal setOpen={setShowModal} /> {/* the component is only imported if the conditions are met */}
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
            <BookingSummary />
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
