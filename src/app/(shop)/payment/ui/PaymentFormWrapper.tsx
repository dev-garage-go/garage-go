"use client"

import { FormProvider, useForm } from 'react-hook-form'
import { PaymentForm } from './PaymentForm'
import { PaymentSummary } from './PaymentSummary'
import { PaymentMethodFormInputs } from '@/interfaces'

export const PaymentFormWrapper = () => {
  const methods = useForm<PaymentMethodFormInputs>({
    defaultValues: {
      paymentMethod: ''
    }
  })

  const onSubmit = (data: PaymentMethodFormInputs) => {
    console.log(data)
  }

  return (
    <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
            <PaymentForm />
            <PaymentSummary />
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
