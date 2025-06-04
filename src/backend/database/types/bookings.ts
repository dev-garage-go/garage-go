import { BookingServiceDataInterface } from "@/features/bookings"
import { VehicleDB } from "./vehicle"

export interface BookingDB extends BookingServiceDataInterface {
  _id?: string
  price?: number
}

// Interface to show in admin dashboard
export interface BookingAdmin extends Omit<BookingDB, 'vehicleID'> {
  vehicle: VehicleDB
}