import { ExtraServices } from '../front/components-interfaces/extra-services';

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

export interface VehicleMileagesOptions {
  quantity: VehicleMileages
}

// TODO: Revisar si esta interfaz es correcta
export interface MileageMaintenanceData {
  mileages: VehicleMileages
  extraServices?: ExtraServices
}

export interface MileageMaintenanceService {
  type: 'mileage'
  name: 'mantencion-kilometraje'
  mileages: VehicleMileages
  extras?: {} // ? Si se opta por seguir con un solo servicio a cobrar tengo que ver esto de las opciones extras
}







// ! Tires changes
export type QuantityTires = 1 | 2 | 3 | 4
export type TypesTiresOptions = 'ciudad' | 'offroad' | 'intermedio'

export interface TiresChangeData {
  promotion: boolean;
  quantityTires: QuantityTires;
  typeTires: TypesTiresOptions;
  tireSize?: string,
  extraServices?: {}
}
