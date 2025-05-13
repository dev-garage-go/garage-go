"use client"

import { FormProvider, useForm } from "react-hook-form";

import { MileageCheckoutFormInputs } from "@/interfaces";
import { useRouter } from "next/navigation";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutSummary } from "./CheckoutSummary";

export const CheckoutFormWrapper = () => {
  const methods = useForm<MileageCheckoutFormInputs>({
    shouldFocusError: true,
    defaultValues: {
      booking: {
        serviceName: "mantencion por kilometraje"
      },
      user: {
        typeAddress: '',
        additionalInfo: ''
      }
    }
  })

  // TODO: Router temporal para mostrar
  const router = useRouter()

  // Funcion que se ejecuta al enviar el formulario
  const onSubmit = (data: MileageCheckoutFormInputs) => {
    console.log(data)
    router.push("/payment")
  }

  return (
    <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
            <CheckoutForm />
            <CheckoutSummary />
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
