'use client'

import { SummaryButton, Summary, SummaryPaymentOpts } from "@/features/payment"
import { setSummaryPropsByServiceType } from "../constants/summary"
import { ServicesTypes } from "@/features/services"

interface Props {
  serviceType: ServicesTypes,
  button: SummaryButton
  payment?: SummaryPaymentOpts
}

export const PaymentSummary = ({ button, serviceType, payment }: Props) => {
  const dynamicProps = setSummaryPropsByServiceType(serviceType)

  return (
    <Summary
      button={{
        text: button.text,
        onClick: button.onClick
      }}
      payment={payment && {
        errorBothMethods: payment ? payment.errorBothMethods : false,
        hasCompletedPaymentData: payment ? payment.hasCompletedPaymentData : false
      }}
      {...dynamicProps}
    />
  )
}
