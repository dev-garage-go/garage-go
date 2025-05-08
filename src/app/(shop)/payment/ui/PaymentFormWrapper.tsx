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
    console.log("Method 😉: ", paymentMethod)
    methods.setValue("methodSelected", paymentMethod)
  }, [paymentMethod])

  const hasPaymentGatewaySelected = methods.watch("paymentGateway");

  const hasCardNumber = methods.watch("userCard.cardNumber");
  const hasCardCVV = methods.watch("userCard.cvv");
  const hasCardExpiry = methods.watch("userCard.expiresIn");
  const hasOwnerName = methods.watch("userCard.ownerName");

  const hasCardData = () => {
    return hasCardNumber || hasCardExpiry || hasCardCVV || hasOwnerName
  }
  // Card data validator
  const setPaymentMethod = () => {
    if (hasCardData() && !hasPaymentGatewaySelected) {
      methods.setValue("methodSelected", "user-card", { shouldValidate: true })
      methods.setValue("paymentGateway", undefined)
      return true

    } else if (hasPaymentGatewaySelected != undefined && !hasCardData()) {
      methods.setValue("methodSelected", "payment-gateway", { shouldValidate: true })
      methods.setValue("userCard", undefined)
      return true

    } else {
      methods.setValue("methodSelected", undefined, { shouldValidate: true })
      return false
    }
  }

  const validateAllFields = (method: string | undefined) => {
    if (method != undefined) {
      if (paymentMethod === method && hasCardData()) {
        return true

      } else if (paymentMethod === method && hasPaymentGatewaySelected) {
        return true

      } else { return false }
    } else { return false }
  }

  const onSubmit = (data: PaymentFormData) => {
    if (setPaymentMethod() && validateAllFields(paymentMethod)) {
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
