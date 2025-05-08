interface Service {
  id: string
  name: string
  slug: string                   // /oil_change
  checkoutSlug: string           // /oil_change/checkout o /tires_change/quotes
  currency: string               // CLP
  offerings: Offering[]          // ofrecimientos del servicio / variantes / combos / servicios que incluye
  breakdown: BreakdownItem[]     // detalle de precios
}

interface Offering {
  name: string                      // nombre producto / servicio -> sintetico, ejeDelantero, etc.
  price: number
  options?: Record<string, number>  // premium: 5000, standard: 2500
  calculationMethod?: string        // fórmula si aplica
  extras?: ExtraOption[]            // limpieza, rectificación, etc.
}

interface ExtraOption {
  name: string
  price: number
}

interface BreakdownItem {
  name: string
  price?: number
  basePrice?: number
  referenceUnit?: number
}
