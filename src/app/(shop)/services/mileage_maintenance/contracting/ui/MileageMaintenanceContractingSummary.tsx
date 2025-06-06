"use client"

import { PaymentSummary } from "@/features/payment"
import { ServicesTypes } from "@/features/services"

interface Props {
  serviceType: ServicesTypes
}

export const MileageMaintenanceContractingSummary = ({ serviceType }: Props) => {
  return (
    <PaymentSummary
      serviceType={serviceType}
      summary={{
        mainService: {
          name: "Mantención por kilometraje",
          description: "Servicio por pauta segun fabricante incluye super check De 35 puntos, lavado express de cortesía en nuestra Hub Ubicado en cordillera 580, pudahuel.",
          hasPrice: true,
          price: 189900,
          referenceValue: "Valor referencial 10.000 kms"
        },
        coupon: {
          hasCoupon: true,
        }
      }}
    />
  )
}
