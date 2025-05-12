"use client"

import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { PaymentForm } from './PaymentForm'
import { PaymentSummary } from './PaymentSummary'
import { PaymentFormSchema } from '@/interfaces'
import { hasCardData, hasCompletedPaymentData, hasValidCardData, hasValidPaymentGateway } from '@/utils'

export const PaymentFormWrapper = () => {
  const methods = useForm<PaymentFormSchema>({
    shouldFocusError: true,
    defaultValues: {
      methodSelected: undefined,
      userCard: undefined,
      paymentGateway: undefined,
      checkTermsAndConditions: false
    }
  })
  const { setValue, handleSubmit, trigger, getValues, watch } = methods
  // view form data
  const card = watch("userCard");
  const paymentGateway = watch("paymentGateway");
  const paymentMethod = watch("methodSelected")
  const termsChecked = watch("checkTermsAndConditions")

  // handle errors
  const [enableButton, setEnableButton] = useState<boolean>(false)
  const showErrorBothMethods = hasValidCardData(card) && hasValidPaymentGateway(paymentGateway)

  // validate payment data when change
  useEffect(() => {
    const dataCompleted = hasCompletedPaymentData(paymentGateway, card);
    if (dataCompleted) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  }, [card?.cardNumber, card?.cvv, card?.expiresIn, card?.ownerName, paymentGateway, paymentMethod, termsChecked]);


  // before sumbit
  const setPaymentMethod = (hasCard: boolean, hasGateway: boolean) => {
    if (!hasCard && hasGateway) {
      setValue("methodSelected", "payment-gateway");
      setValue("userCard", undefined)

    } else if (hasCard && !hasGateway) {
      setValue("methodSelected", "user-card");
      setValue("paymentGateway", undefined)

    } else {
      setValue("methodSelected", undefined);
    }
  }

  const onSubmit = (data: PaymentFormSchema) => {
    if (!termsChecked) return;

    const hasCard = hasCardData(card)
    const hasGateway = paymentGateway != undefined

    // set method
    setPaymentMethod(hasCard, hasGateway)

    // revalidate fields of form to throw errors if exist
    const isValid = trigger("userCard");
    if (!isValid || !hasCompletedPaymentData(paymentGateway, card)) return;

    // obtain new values with 'methodPayment' setted
    const newValues = getValues()
    console.log(newValues)
  }


  return (
    <section className="mt-10 max-w-page padding-central-page pb-from-footer w-full">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
            <PaymentForm />
            <PaymentSummary
              hasCompletedPaymentData={enableButton}
              errorBothMethods={showErrorBothMethods}
            />
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
