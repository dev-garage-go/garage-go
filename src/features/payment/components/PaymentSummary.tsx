'use client'

import { useServiceContext } from "@/features/services"
import { usePaymentContext, Summary, SummaryInstanceProps } from "@/features/payment"
import { setSummaryPropsByServiceType } from "../constants/summary"

export const PaymentSummary = () => {
  const { getServiceFromStorage } = useServiceContext()
  const { baseAmount, finalAmount } = usePaymentContext()

  // vehicle and service from storage
  const service = getServiceFromStorage()

  // baseAmount and finalAmount are setted in an useEffect in PaymentContext()
  const bill = {
    subtotal: !service ? baseAmount.subtotal : finalAmount.subtotal,
    dctos: !service ? baseAmount.disscount : finalAmount.disscount,
    total: !service ? baseAmount.total : finalAmount.total,
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
