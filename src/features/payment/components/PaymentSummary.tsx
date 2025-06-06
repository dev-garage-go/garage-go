'use client'

import { useCallback, useEffect, useMemo, useState } from "react"
import { ServicesTypes, useServiceContext } from "@/features/services"
import { useGetVehicleOnChangeStorage } from "@/features/vehicle"
import { usePaymentContext, Summary, SummaryInstanceProps } from "@/features/payment"

interface Props {
  serviceType: ServicesTypes
  summary: SummaryInstanceProps
}

export const PaymentSummary = ({ serviceType, summary }: Props) => {
  const { getServiceFromStorage } = useServiceContext()
  const {
    sendBaseChargeByVehicleRequest,
    sendFinalChargeByService,
    baseAmount,
    finalAmount } = usePaymentContext()

  // vehicle and service from storage
  const service = useMemo(() => getServiceFromStorage(), [])
  const vehicle = useGetVehicleOnChangeStorage()

  const [mounted, setMounted] = useState(false)
  const { coupon, mainService, secundaryService } = summary;

  useEffect(() => {
    setMounted(true)
  }, [])

  const sendChargeRequest = useCallback(async () => {
    // if not exist service, the user is in contracting page so calculate the base charge amount by vehicle
    if (vehicle && !service) {
      await sendBaseChargeByVehicleRequest({ serviceType, vehicle })
      return
    }
    // if service exist, the user is in booking page so calculate the final charge amount
    else if (vehicle && service) {
      await sendFinalChargeByService("prueba")
      return
    }
  }, [vehicle, service, serviceType, sendBaseChargeByVehicleRequest, sendFinalChargeByService])

  useEffect(() => {
    if (!mounted) return
    const run = async () => {
      await sendChargeRequest()
    }
    run()
  }, [mounted, sendChargeRequest])



  const bill = {
    subtotal: !service ? baseAmount.subtotal : finalAmount.subtotal,
    dctos: !service ? baseAmount.disscount : finalAmount.disscount,
    total: !service ? baseAmount.total : finalAmount.total,
    btnString: "Continuar",
  }

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
        bill={bill}
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
      bill={bill}
    />
  )
}
