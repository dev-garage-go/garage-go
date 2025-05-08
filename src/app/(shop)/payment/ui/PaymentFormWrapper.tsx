"use client"

import { FormProvider, useForm } from 'react-hook-form'
import { PaymentForm } from './PaymentForm'
import { PaymentSummary } from './PaymentSummary'
import { PaymentFormData, paymentFormSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'

export const PaymentFormWrapper = () => {
  const methods = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    shouldFocusError: true,
    defaultValues: {
      methodSelected: undefined,
      userCard: {
        cardNumber: "",
        ownerName: "",
        expiresIn: "",
        cvv: "",
      },
      paymentGateway: undefined,
    }
  })

  const { setValue, handleSubmit, watch } = methods

  // TODO: Hacer que el calendario funcione

  const hasPaymentGateway = watch("paymentGateway");
  const card = watch("userCard");

  const hasCardData = () => {
    return !!card?.cardNumber || !!card?.expiresIn || !!card?.cvv || !!card?.ownerName
  }

  const onSubmit = (data: PaymentFormData) => {
    console.log(data)

    const hasCard = hasCardData()
    const hasGateway = !!hasPaymentGateway

    if (hasCard && !hasGateway) {
      setValue("methodSelected", "user-card")
    } else if (!hasCard && hasGateway) {
      setValue("methodSelected", "payment-gateway")
    } else if (!hasCard && !hasGateway) {
      setValue("methodSelected", undefined)
    }

    console.log("punto 1")
    const result = methods.trigger() // vuelve a ejecutar la validación con Zod

    console.log("punto 2")
    result.then(valid => {
      if (valid) {
        console.log("✅ DATA VÁLIDA:", methods.getValues())
      } else {
        console.log("❌ ERRORES EN EL FORMULARIO")
      }
    })
  }


  return (
    <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
            <PaymentForm />
            <PaymentSummary />
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
