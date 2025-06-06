'use client'

import { useEffect, useState } from "react"
import { usePaymentContext, Summary, SummaryInstanceProps } from "@/features/payment"
import { ServicesTypes } from "@/features/services"
import { useGetVehicleOnChangeStorage } from "@/features/vehicle"

interface Props {
  serviceType: ServicesTypes
  summary: SummaryInstanceProps
}

export const ContractingPageSummary = ({ serviceType, summary }: Props) => {
  const vehicle = useGetVehicleOnChangeStorage()
  const { sendBaseChargeByVehicleRequest, baseAmount } = usePaymentContext()

  const [mounted, setMounted] = useState(false)
  const { coupon, mainService, secundaryService } = summary;

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && vehicle) {
      sendBaseChargeByVehicleRequest({ serviceType, vehicle })
    }
  }, [mounted])

  if (secundaryService) {
    return (
      <Summary
        mainService={{
          name: mainService.name,
          description: mainService.description,
          hasPrice: mainService.hasPrice,
          price: mainService.price,
          referenceValue: mainService.referenceValue
        }}
        coupon={{
          hasCoupon: coupon.hasCoupon,
        }}
        secundaryService={{
          name: secundaryService.name,
          description: secundaryService.description,
          price: secundaryService.price
        }}
        bill={{
          subtotal: baseAmount.subtotal,
          dctos: baseAmount.disscount,
          total: baseAmount.total,
          btnString: "Continuar",
        }}
      />
    )
  }

  return (
    <Summary
      mainService={{
        name: mainService.name,
        description: mainService.description,
        hasPrice: mainService.hasPrice,
        price: mainService.price,
        referenceValue: mainService.referenceValue
      }}
      coupon={{
        hasCoupon: coupon.hasCoupon,
      }}
      bill={{
        subtotal: baseAmount.subtotal,
        dctos: baseAmount.disscount,
        total: baseAmount.total,
        btnString: "Continuar",
      }}
    />
  )
}
