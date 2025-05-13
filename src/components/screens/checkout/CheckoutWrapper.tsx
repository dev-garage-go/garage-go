"use client"

import { FormProvider, useForm } from "react-hook-form";

import { CheckoutFormData } from "@/interfaces";
import { useRouter } from "next/navigation";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutSummary } from "./CheckoutSummary";
import { useGetServiceName } from "@/hooks";

interface Props {
  withBooking: boolean
}

export const CheckoutFormWrapper = ({ withBooking }: Props) => {
  const methods = useForm<CheckoutFormData>({
    shouldFocusError: true,
    defaultValues: {
      booking: {
        serviceName: useGetServiceName()
      },
      user: {
        typeAddress: '',
        additionalInfo: ''
      }
    }
  })

  // TODO: action/calcAmountByService(service: string, data: {})
  const router = useRouter()

  // Funcion que se ejecuta al enviar el formulario
  const onSubmit = (data: CheckoutFormData) => {
    console.log(data)
    router.push("/payment")
  }

  return (
    <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
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
