import { Summary } from "@/components"

export const MileageMaintenanceSummary = () => {
  return (
    <Summary
      mainService={{
        name: "Mantención por kilometraje",
        description: "Servicio por pauta segun fabricante incluye super check De 35 puntos, lavado express de cortesía en nuestra Hub Ubicado en cordillera 580, pudahuel.",
        hasPrice: true,
        price: 189900,
        referenceValue: "Valor referencial 10.000 kms"
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
        subtotal: 225890,
        dctos: 0,
        total: 225890,
        btnString: "Continuar",
        // btnAction: () => console.log("action"),
      }}
    />
  )
}
