import { AmountInterface } from "@/features/bookings";
import { ServicesDataType, ServicesTypes } from "@/features/services";
import { ServerVehicleResponse } from "@/features/vehicle";

export interface ServiceChargeInterface {
  service: ServicesDataType
  baseAmount: AmountInterface
}

export interface BaseChargeByVehicle {
  serviceType: ServicesTypes
  vehicle: ServerVehicleResponse
}