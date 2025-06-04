import { BookingServiceDataInterface } from "@/features/bookings"
import { VehicleDB } from "./vehicle"
import { ObjectId } from "mongodb"
import { VehicleWithStringIDInterface } from "@/features/vehicle"

// objeto de como queda la reserva en base de datos, con el vehicle id siendo un ObjectID de Mongo
export interface BookingDB extends Omit<BookingServiceDataInterface, 'vehicleID'> {
  _id?: ObjectId  // debe ser opcional porque de esa forma mongodb se encarga de crearlo al impactar la db
  price?: number
  vehicleID: ObjectId
}

// objeto de como deberian ver los vendedores una reserva, ignorando el vehicleID 
// y viendo el vehiculo
export interface BookingAdmin extends Omit<BookingDB, 'vehicleID' | '_id'> {
  _id: string
  vehicle: VehicleWithStringIDInterface
}