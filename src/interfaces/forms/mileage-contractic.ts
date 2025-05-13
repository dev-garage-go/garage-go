import { VehicleMileages } from "./vehicle-mileages";
import { ExtraServices } from '../components-interfaces/extra-services';

export interface MileageContractingForm {
  mileages: VehicleMileages
  extraServices?: ExtraServices
}
