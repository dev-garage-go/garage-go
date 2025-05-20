import { TiresChangeData, MileageMaintenanceService } from '@/interfaces/shared/services'

export interface TiresChangeServiceDB extends TiresChangeData {
  _id: string
  price: number
}

export interface MileageMaintenanceServiceDB extends MileageMaintenanceService {
  _id: string
  price: number
}

export type ServiceDB = TiresChangeServiceDB | MileageMaintenanceServiceDB
