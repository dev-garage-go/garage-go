"use client"

import { FormProvider, useForm } from 'react-hook-form'
import { PaymentForm } from './PaymentForm'
import { PaymentSummary } from './PaymentSummary'
import { PaymentFormSchema } from '@/interfaces'

export const PaymentFormWrapper = () => {
  const methods = useForm<PaymentFormSchema>({
    shouldFocusError: true,
    defaultValues: {
      methodSelected: undefined,
      userCard: undefined,
      paymentGateway: undefined,
    }
  })

  const { setValue, handleSubmit, getValues, watch } = methods

  const hasPaymentGateway = watch("paymentGateway");
  const card = watch("userCard");

  const hasCardData = () => {
    return !!card?.cardNumber || !!card?.expiresIn || !!card?.cvv || !!card?.ownerName
  }

  const hasCompletedCardData = () => {
    return !!card?.cardNumber && !!card?.expiresIn && !!card?.cvv && !!card?.ownerName
  }

  const onSubmit = (data: PaymentFormSchema) => {
    const hasCard = hasCardData()
    const hasGateway = hasPaymentGateway != undefined

    // set method
    if (!hasCard && hasGateway) {
      setValue("methodSelected", "payment-gateway");
      setValue("userCard", undefined)

    } else if (hasCard && !hasGateway) {
      setValue("methodSelected", "user-card");
      setValue("paymentGateway", undefined)

    } else {
      setValue("methodSelected", undefined);
    }

    // validate complete data card
    if (hasCard && !hasCompletedCardData()) {
      return new Error("Se requieren todos los campos de su tarjeta de debito/credito")
    }

    const newValues = getValues()
    console.log(newValues)
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
