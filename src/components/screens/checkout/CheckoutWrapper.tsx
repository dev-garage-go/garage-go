"use client"

import { FormProvider, useForm } from "react-hook-form";

import { CheckoutForm } from "./CheckoutForm";
import { CheckoutSummary } from "./CheckoutSummary";
import { HoverPortal, LicensePlateModal } from "@/components";

import { AppointmentData, ServicesNames } from "@/interfaces";
import { useGetServiceName } from "@/hooks";
import { useBookingContext, useVehicleContext } from "@/contexts";

interface Props {
  withBooking: boolean
}

export const CheckoutFormWrapper = ({ withBooking }: Props) => {
  const methods = useForm<AppointmentData>({
    shouldFocusError: true,
    defaultValues: {
      user: {
        typeAddress: '',
        additionalInfo: ''
      }
    }
  })

  // TODO: action/calcAmountByService(service: string, data: {})
  const { licensePlate, modalIsOpen, setModalIsOpen } = useVehicleContext()
  const { setBookingInStorage } = useBookingContext()

  // Func that will be executed when form its submitted
  const onSubmit = (data: AppointmentData) => {
    console.log(data)
    setBookingInStorage(data)
  }

  return (
    <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
      {!licensePlate && modalIsOpen &&
        <HoverPortal>
          <LicensePlateModal setClose={setModalIsOpen} />
        </HoverPortal>
      }
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
            <CheckoutForm withBooking={withBooking} />
            <CheckoutSummary />
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
