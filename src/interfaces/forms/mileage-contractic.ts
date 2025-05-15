import { ExtraServices } from '../components-interfaces/extra-services';

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

export interface MileageContractingForm {
  mileages: VehicleMileages
  extraServices?: ExtraServices
}
