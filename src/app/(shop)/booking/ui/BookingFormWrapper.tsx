"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { ModalPortal } from "@/components";

import { ServicesTypes, useServiceContext } from "@/features/services";
import { LazyVehicleDataModal, useVehicleContext } from "@/features/vehicle";
import { PaymentSummary } from "@/features/payment";
import {
  AppointmentDataInterface,
  useBookingContext,
  LazyConfirmationBookingModal,
} from "@/features/bookings"

import { BookingForm } from "../ui/BookingForm";

interface Props {
  params: {
    service_type: string
  }
}

export const BookingFormWrapper = ({ params }: Props) => {
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
  const serviceType = params.service_type as ServicesTypes;

  const { vehicleInStorage, showModal } = useVehicleContext()
  const { createServiceBooking } = useBookingContext()
  const { serviceInStorage } = useServiceContext()

  // guard
  useEffect(() => {
    if (!serviceInStorage) router.replace("/services");
  }, [serviceInStorage, router])

  // Func that will be executed when form its submitted
  const onSubmit = async (data: AppointmentDataInterface) => {
    createServiceBooking(data)
  }

  return (
    <section className="max-w-page padding-central-page mt-from-topbanner pb-from-footer w-full">
      {/* if vehicle data doesn't exist, the modal will be open, otherwise it will be closed */}
      {!vehicleInStorage &&
        <ModalPortal isOpen={showModal}>
          <LazyVehicleDataModal /> {/* the component is only imported if the conditions are met */}
        </ModalPortal>
      }
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
            <BookingForm withBooking />
            <PaymentSummary
              serviceType={serviceType}
              button={{ text: 'Reservar' }}
            />
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
