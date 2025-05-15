// bogo: 'Buy One Get One' -> promotion as 2x1 or 4x3
// percentaje: '%' -> 10% or 15%
// fixed: 'Fixed amount' -> $10.000 or $500 of discount 

export type PromotionType = 'percentage' | 'fixed' | 'bogo'

export interface Promotion {
  type: PromotionType
  description: string
  value: number           // percent % or fixed amount
  expiresAt?: string      // date
  buyQuantity?: number    // just for 'bogo' -> example value 2: 2xn
  getQuantity?: number    // just for 'bogo' -> example value 2: nx2
}
