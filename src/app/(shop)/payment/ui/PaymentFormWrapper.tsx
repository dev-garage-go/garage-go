"use client"

import { FormProvider, useForm } from 'react-hook-form'
import { PaymentForm } from './PaymentForm'
import { PaymentSummary } from './PaymentSummary'
import { PaymentFormData } from '@/schemas'
import { useEffect, useState } from 'react'

export const PaymentFormWrapper = () => {
  const methods = useForm<PaymentFormData>({
    shouldFocusError: true
  })
  const paymentMethod = methods.watch("methodSelected")

  useEffect(() => {
    console.log('method', paymentMethod)
  }, [paymentMethod])

  // Card data validator
  const setPaymentMethod = () => {
    const hasPaymentGatewaySelected = methods.watch("paymentGateway");

    const hasCardNumber = methods.watch("userCard.cardNumber");
    const hasCardCVV = methods.watch("userCard.cvv");
    const hasCardExpiry = methods.watch("userCard.expiresIn");
    const hasOwnerName = methods.watch("userCard.ownerName");

    const hasCardData = () => {
      if (hasCardNumber || hasCardExpiry || hasCardCVV || hasOwnerName) return true
      else false
    }

    if (hasCardData() && !hasPaymentGatewaySelected) {
      methods.setValue("methodSelected", "user-card")
      methods.setValue("paymentGateway", undefined)
      return true

    } else if (hasPaymentGatewaySelected != undefined && !hasCardData()) {
      methods.setValue("methodSelected", "payment-gateway")
      methods.setValue("userCard", undefined)
      return true

    } else {
      methods.setValue("methodSelected", undefined)
      return false
    }
  }

  const onSubmit = (data: PaymentFormData) => {
    if (setPaymentMethod()) {
      console.log(data)
    } else console.log("sin data")
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
