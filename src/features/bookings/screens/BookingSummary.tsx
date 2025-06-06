import { usePaymentContext, Summary } from "@/features/payment"

export const BookingSummary = () => {
  const { baseAmount } = usePaymentContext()

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
        subtotal: 225890,
        dctos: 0,
        total: 225890,
        btnString: "Continuar",
      }}
    />
  )
}
