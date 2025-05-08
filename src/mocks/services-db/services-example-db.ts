const services = [
  {
    name: "cambio de aceite y filtro",
    service_slug: "/oil_change",
    service_checkout_slug: "/oil_change/checkout", // el checkout de un servicio podria llamarse diferente a otro, por ejemplo /tires_change/quotes
    offerings: {
      sintetico: 3000,
      mineral: 1000,
      includeFilter: {
        premium: 5000,
        standard: 2500
      },
    },
    breakdown: [
      { name: "aceite sintetico", price: 3000, unit: 1 },
      { name: "aceite mineral", price: 1000, unit: 1 }
    ],
    currency: "CLP"
  },

  {
    name: "mantenimiento por kilometraje",
    service_slug: "/mileage_maintenance",
    service_checkout_slug: "/mileage_maintenance/checkout", // el checkout de un servicio podria llamarse diferente a otro, por ejemplo /tires_change/quotes
    offerings: {
      basePrice: 20000,
      referenceUnit: 10000,
      referenceInfo: "se cobra el precio base (basePrice) dividido el kilometraje del vehiculo (referenceUnit). calc: basePrice / unit"
    },
    breakdown: [
      { name: "mantenimiento general", basePrice: 20000, referenceUnit: 10000 },
    ],
    currency: "CLP"
  },

  {
    name: "mantenimiento de frenos",
    service_slug: "/brakes_maintenance",
    service_checkout_slug: "/mileage_maintenance/checkout", // el checkout de un servicio podria llamarse diferente a otro, por ejemplo /tires_change/quotes
    offerings: {
      ejeDelantero: 35990,
      ejeTrasero: 30400,
      ambosEjes: 30400,
      extras: [
        {
          limpieza: 3000
        },
        {
          cambioPastillas: 4000
        },
        {
          cambioDiscos: 3000
        },
        {
          rectificacionDiscos: 2400
        },
      ]
    },
    breakdown: [
      { name: "mantenimiento general", basePrice: 20000, referenceUnit: 10000 },
    ],
    currency: "CLP"
  }
]