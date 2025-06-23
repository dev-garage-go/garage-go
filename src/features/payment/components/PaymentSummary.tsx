'use client'

import { PaymentSummaryButton, Summary } from "@/features/payment"
import { setSummaryPropsByServiceType } from "../constants/summary"
import { ServicesTypes } from "@/features/services"

interface Props {
  serviceType: ServicesTypes,
  button: PaymentSummaryButton
}

export const PaymentSummary = ({ button, serviceType }: Props) => {
  const dynamicProps = setSummaryPropsByServiceType(serviceType)

  return (
    <Summary
      button={{ text: button.text }}
      {...dynamicProps}
    />
  )
}
