import { TiresChangeServiceInterface, MileageMaintenanceServiceInterface } from '@/features/services'

export interface TiresChangeServiceDB extends TiresChangeServiceInterface {
  _id: string
  price: number
}

export interface MileageMaintenanceServiceDB extends MileageMaintenanceServiceInterface {
  _id: string
  price: number
}

export type ServiceDB = TiresChangeServiceDB | MileageMaintenanceServiceDB
