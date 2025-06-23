import { PromotionInterface } from '@/features/promotions';

// Special options of services
export type VehicleMileagesType = (
  '10.000 kms' | '20.000 kms' | '30.000 kms' | '40.000 kms' | '50.000 kms' |
  '60.000 kms' | '70.000 kms' | '80.000 kms' | '90.000 kms' | 'Otro'
)

export type QuantityTiresType = 1 | 2 | 3 | 4
export type TypesTiresOptionsType = 'ciudad' | 'offroad' | 'intermedio'

// Services interfaces  

type ServicesNames = 'tires_change' | 'mileage_maintenance'
export type ServicesTypes = 'tires' | 'mileage'

export const ServiceNamesMap: Record<ServicesNames, string> = {
  "mileage_maintenance": "mantención por kilometraje",
  "tires_change": "cambio de neumaticos"
} as const

interface BaseServiceInterface {
  type: ServicesTypes
  name: ServicesNames
  promotion?: PromotionInterface
  // extras?: {} -> Si se opta por seguir con un solo servicio a cobrar tengo que ver esto de las opciones extras
}

export interface MileageMaintenanceServiceInterface extends BaseServiceInterface {
  type: 'mileage'
  name: 'mileage_maintenance'
  mileages: VehicleMileagesType
}

export interface TiresChangeServiceInterface extends BaseServiceInterface {
  type: 'tires'
  name: 'tires_change'
  quantityTires: QuantityTiresType;
  typeTires: TypesTiresOptionsType;
  tireSize: string,
}

export type ServicesDataType = TiresChangeServiceInterface | MileageMaintenanceServiceInterface
