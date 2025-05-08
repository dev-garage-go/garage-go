const service = {
  id: "uuid",
  name: "cambio de aceite y filtro",
  slug: "oil_change",
  checkoutSlug: "checkout",
  currency: "CLP",
  offerings: [
    {
      name: "sintético",
      price: 3000
    },
    {
      name: "mineral",
      price: 1000
    },
    {
      name: "Filtro incluido",
      options: {
        premium: 5000,
        standard: 2500
      }
    }
  ],
  breakdown: [
    {
      name: "aceite sintético",
      price: 3000,
      unit: 1
    },
    {
      name: "aceite mineral",
      price: 1000,
      unit: 1
    }
  ]
}