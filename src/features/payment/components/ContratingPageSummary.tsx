'use client'

import { useEffect, useState } from "react"
import { usePaymentContext, Summary, SummaryProps } from "@/features/payment"
import { ServicesTypes } from "@/features/services"
import { useGetVehicleOnChangeStorage } from "@/features/vehicle"

interface Props {
  serviceType: ServicesTypes
  summary: SummaryProps
}

export const ContractingPageSummary = ({ serviceType }: Props) => {
  const vehicle = useGetVehicleOnChangeStorage()
  const { sendBaseChargeByVehicleRequest, baseAmount } = usePaymentContext()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && vehicle) {
      sendBaseChargeByVehicleRequest({ serviceType, vehicle })
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
