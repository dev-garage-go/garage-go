'use client'

import { useEffect, useState } from "react"
import { usePaymentContext, Summary } from "@/features/payment"
import { ServicesTypes } from "@/features/services"
import { useGetVehicleOnChangeStorage } from "@/features/vehicle"

interface Props {
  serviceType: ServicesTypes
}

export const MileageMaintenanceContractingSummary = ({ serviceType }: Props) => {
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
        description: "Servicio por pauta segun fabricante incluye super check De 35 puntos, lavado express de cortesía en nuestra Hub Ubicado en cordillera 580, pudahuel.",
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
