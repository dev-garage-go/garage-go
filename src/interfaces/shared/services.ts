import { Promotion } from './promotions';

// Special options of services
export type VehicleMileages = (
  '10.000 kms' |
  '20.000 kms' |
  '30.000 kms' |
  '40.000 kms' |
  '50.000 kms' |
  '60.000 kms' |
  '70.000 kms' |
  '80.000 kms' |
  '90.000 kms' |
  'Otro'
)

export type QuantityTires = 1 | 2 | 3 | 4
export type TypesTiresOptions = 'ciudad' | 'offroad' | 'intermedio'

// Services interfaces
interface BaseService {
  type: string
  name: string
  promotion?: Promotion
  // extras?: {} -> Si se opta por seguir con un solo servicio a cobrar tengo que ver esto de las opciones extras
}

export interface MileageMaintenanceService extends BaseService {
  mileages: VehicleMileages
}

export interface TiresChangeData {
  quantityTires: QuantityTires;
  typeTires: TypesTiresOptions;
  tireSize: string,
}
