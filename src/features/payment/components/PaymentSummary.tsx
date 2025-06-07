'use client'

import { usePaymentContext, Summary } from "@/features/payment"
import { setSummaryPropsByServiceType } from "../constants/summary"

export const PaymentSummary = () => {
  const { handleShowAmount } = usePaymentContext()

  const bill = {
    subtotal: handleShowAmount().subtotal,
    dctos: handleShowAmount().disscount,
    total: handleShowAmount().total,
    btnString: "Continuar",
  }

  const dynamicProps = setSummaryPropsByServiceType("mileage")

  return (
    <Summary
      bill={bill}
      {...dynamicProps}
    />
  )
}
