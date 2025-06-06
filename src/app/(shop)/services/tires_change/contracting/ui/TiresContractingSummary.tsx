import { PaymentSummary } from "@/features/payment"

export const TiresContractingSummary = () => {
  return (
    <PaymentSummary
      summary={{
        mainService: {
          name: "Cambio de Neumáticos",
          description: "Servicio incluye instalación, balanceo, super check de 35 puntos, lavado Retiro y entrega a domicilio con Pick&delivery",
          hasPrice: false,
          price: 9,
          referenceValue: "A cotizar promocion 4x3 275 / 40 / 18"
        },
        coupon: {
          hasCoupon: true,
        }
      }}
    />
  )
}
