'use client'

import { useEffect, useState } from "react"
import { usePaymentContext, Summary, SummaryProps } from "@/features/payment"
import { ServicesTypes, useServiceContext } from "@/features/services"
import { useGetVehicleOnChangeStorage } from "@/features/vehicle"

interface Props {
  summary: SummaryProps
}

export const ContractingSummary = ({ summary }: Props) => {
  const { getServiceFromStorage, deleteServiceFromStorage } = useServiceContext()
  const { sendFinalChargeByService, baseAmount } = usePaymentContext()

  const service = getServiceFromStorage()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && service) {
      sendFinalChargeByService("prueba")
    }
  }, [mounted])

  return (
    <Summary
      mainService={{
        name: "Mantención por kilometraje",
        description: "Servicio por pauta segun...",
        hasPrice: true,
        price: 189900,
        referenceValue: "Valor referencial 10.000 kms"
      }}

      coupon={{
        hasCoupon: true,
      }}
      summary={{
        subtotal: baseAmount.subtotal,
        dctos: baseAmount.disscount,
        total: baseAmount.total,
        btnString: "Continuar",
      }}
    />
  )
}
