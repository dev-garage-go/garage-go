'use client'

import { usePaymentContext, Summary } from "@/features/payment"
import { setSummaryPropsByServiceType } from "../constants/summary"
import { useEffect, useState } from "react"
import { getBaseAmountInCookie } from "@/backend/actions"
import { AmountInterface } from "@/features/bookings"

export const PaymentSummary = () => {
  const { baseAmount } = usePaymentContext()
  const [amountInCookie, setAmountInCookie] = useState<AmountInterface>()

  // verify cookie
  useEffect(() => {
    const verifyCookie = async () => {
      const response = await getBaseAmountInCookie()
      if (!response.success || response.data === null) return;
      setAmountInCookie(response.data)
    }
    verifyCookie()
  }, [])

  // baseAmount, finalAmount and amountInCookie are setted in an useEffect in PaymentContext()
  const handleShowAmount = (): AmountInterface => {
    if (amountInCookie) {
      return amountInCookie
    }
    else {
      return baseAmount
    }
  }

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
