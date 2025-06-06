import { SelectOptions } from "@/types";
import { vehicleTypes } from "../types/vehicle";

export const VehicleTypeOptions: SelectOptions<vehicleTypes>[] = [
  { id: 1, value: "Alta gama" },
  { id: 2, value: "City Car / Sedan" },
  { id: 3, value: "SUV / Camioneta" }
]