import { SelectOptions } from "@/types";
import { vehicleTypes } from "../types/vehicle";

export const VehicleTypeOptions: SelectOptions<vehicleTypes>[] = [
  { id: 1, value: "city car / sedan" },
  { id: 2, value: "alta gama" },
  { id: 3, value: "suv / camioneta" }
]