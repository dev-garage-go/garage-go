"use client"

import { useEffect, useState } from "react";
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
import { useServiceContext } from "@/features/services";
import { useRouter } from "next/navigation";

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

  const router = useRouter()

  const { vehicleInStorage, showModal } = useVehicleContext()
  const { createServiceBooking, bookingCreated } = useBookingContext()
  const { serviceInStorage } = useServiceContext()

  const [showConfirmModal, setShowConfirmModal] = useState(false)

  // guard
  useEffect(() => {
    if (!serviceInStorage && !showConfirmModal) {
      router.back()
    };
  }, [serviceInStorage, router, showConfirmModal])

  // Func that will be executed when form its submitted
  const onSubmit = async (data: AppointmentDataInterface) => {
    createServiceBooking(data)
    setShowConfirmModal(true)
  }

  return (
    <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
      {/* if vehicle data doesn't exist, the modal will be open, otherwise it will be closed */}
      {!vehicleInStorage &&
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
