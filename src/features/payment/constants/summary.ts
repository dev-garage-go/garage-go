import { ServicesTypes } from '@/features/services';

export const setSummaryPropsByServiceType = (type: ServicesTypes) => {
  switch (type) {
    case "mileage":
      return {
        mainService: {
          name: "Mantención por kilometraje",
          description: "Servicio por pauta según fabricante incluye super check de 35 puntos, lavado express de cortesía en nuestra Hub ubicado en Cordillera 580, Pudahuel.",
          hasPrice: true,
          price: 189900,
          referenceValue: "Valor referencial 10.000 kms",
        },
        coupon: {
          hasCoupon: true
        }
      }

    case "tires":
      return {
        mainService: {
          name: "Cambio de Neumáticos",
          description: "Servicio incluye instalación, balanceo, super check de 35 puntos, lavado Retiro y entrega a domicilio con Pick&delivery",
          hasPrice: true,
          price: 9,
          referenceValue: "Valor referencial 10.000 kms",
        },
        coupon: {
          hasCoupon: true
        },
      }
  }
}
