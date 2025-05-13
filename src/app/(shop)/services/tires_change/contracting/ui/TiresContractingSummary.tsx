import { Summary } from "@/components"

export const TiresCheckoutSummary = () => {
  return (
    <Summary
      mainService={{
        name: "Cambio de Neumáticos",
        description: "Servicio incluye instalación, balanceo, super check de 35 puntos, lavado Retiro y entrega a domicilio con Pick&delivery",
        hasPrice: false,
        price: 9,
        referenceValue: "A cotizar promocion 4x3 275 / 40 / 18"
      }}
      secundaryService={{
        name: "Servicio de frenos",
        description: "Revisión y limpieza de ambos ejes",
        price: 35990
      }}
      coupon={{
        hasCoupon: true,
      }}
      summary={{
        subtotal: 35990,
        dctos: 5000,
        total: 30990,
        btnString: "Continuar",
      }}
    />
  )
}
