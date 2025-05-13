export type QuantityTires = 0 | 1 | 2 | 3 | 4
export type TypesTiresOptions = 'ciudad' | 'offroad' | 'intermedio'

export interface TiresChangeData {
  promotion: boolean;
  quantityTires: QuantityTires;
  typeTires: TypesTiresOptions;
  tireSize?: string,
  extraServices?: {}
}
