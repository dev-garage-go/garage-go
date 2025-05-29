"use client"

import { FormProvider, useForm } from "react-hook-form";

import { ModalPortal, ConfirmationBookingModal } from "@/components";
import { BookingForm, AppointmentData, BookingSummary, useBookingContext } from "@/features/bookings"
import { useVehicleContext, VehicleDataModal } from "@/features/vehicle";


interface Props {
  withBooking: boolean
}

export const BookingFormWrapper = ({ withBooking }: Props) => {
  const methods = useForm<AppointmentData>({
    shouldFocusError: true,
    defaultValues: {
      user: {
        typeAddress: 'casa',
        additionalInfo: ''
      }
    }
  })

  // TODO: action/calcAmountByService(service: string, data: {})
  const { licensePlate, modalIsOpen, setModalIsOpen } = useVehicleContext()
  const { createServiceBooking, bookingCreated } = useBookingContext()

  // Func that will be executed when form its submitted
  const onSubmit = (data: AppointmentData) => {
    console.log(data)
    createServiceBooking(data)
  }

  return (
    <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
      {/* if vehicle data doesn't exist, the modal will be open, otherwise it will be closed */}
      {!licensePlate && modalIsOpen &&
        <ModalPortal>
          <VehicleDataModal setClose={setModalIsOpen} />
        </ModalPortal>
      }
      {/* when the backend will responded if the booking is successfully created or not, show modal */}
      {typeof bookingCreated === 'boolean' && (
        <ModalPortal>
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
