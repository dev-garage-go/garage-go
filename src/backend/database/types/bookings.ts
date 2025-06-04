import { BookingServiceDataInterface } from "@/features/bookings"
import { VehicleDB } from "./vehicle"
import { ObjectId } from "mongodb"

// objeto de como queda la reserva en base de datos, con el vehicle id siendo un ObjectID de Mongo
export interface BookingDB extends Omit<BookingServiceDataInterface, 'vehicleID'> {
  _id?: string
  price?: number
  vehicleID: ObjectId
}

// objeto de como deberian ver los vendedores una reserva, ignorando el vehicleID 
// y viendo el vehiculo
export interface BookingAdmin extends Omit<BookingDB, 'vehicleID'> {
  vehicle: VehicleDB
}