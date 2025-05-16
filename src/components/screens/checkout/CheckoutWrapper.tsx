"use client"

import { FormProvider, useForm } from "react-hook-form";

import { CheckoutForm } from "./CheckoutForm";
import { CheckoutSummary } from "./CheckoutSummary";
import { HoverPortal, LicensePlateModal } from "@/components";

import { CheckoutFormData, ServicesNames, TypeServicesMap } from "@/interfaces";
import { useGetServiceName } from "@/hooks";
import { useLicensePlateContext } from "@/contexts";

interface Props {
  withBooking: boolean
}

export const CheckoutFormWrapper = ({ withBooking }: Props) => {
  const serviceName = useGetServiceName() as ServicesNames
  const methods = useForm<CheckoutFormData>({
    shouldFocusError: true,
    defaultValues: {
      services: {
        name: serviceName,
        type: TypeServicesMap[serviceName]
      },
      user: {
        typeAddress: '',
        additionalInfo: ''
      }
    }
  })

  // TODO: action/calcAmountByService(service: string, data: {})
  const { licensePlate, licensePlateModalIsOpen, setLicensePlateModalIsOpen } = useLicensePlateContext()

  // Func that will be executed when form its submitted
  const onSubmit = (data: CheckoutFormData) => {
    console.log(data)

  }

  return (
    <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
      {!licensePlate && licensePlateModalIsOpen &&
        <HoverPortal>
          <LicensePlateModal setClose={setLicensePlateModalIsOpen} />
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
