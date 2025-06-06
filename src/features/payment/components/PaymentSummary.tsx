'use client'

import { useServiceContext } from "@/features/services"
import { usePaymentContext, Summary, SummaryInstanceProps } from "@/features/payment"

interface Props {
  summary: SummaryInstanceProps
}

export const PaymentSummary = ({ summary }: Props) => {
  const { coupon, mainService, secundaryService } = summary;

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
