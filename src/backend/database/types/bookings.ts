import { BookingServiceDataInterface } from "@/features/bookings"
import { ObjectId } from "mongodb"
import { ServerVehicleResponse } from "@/features/vehicle"

// objeto de como queda la reserva en base de datos, con el vehicle id siendo un ObjectID de Mongo
export interface BookingDB extends Omit<BookingServiceDataInterface, 'vehicle_id'> {
  _id?: ObjectId  // debe ser opcional porque de esa forma mongodb se encarga de crearlo al impactar la db
  price?: number
  vehicle_id: ObjectId
  order_id?: ObjectId
}

// objeto de como deberian ver los vendedores una reserva, ignorando el vehicleID 
// y viendo el vehiculo
export interface BookingAdmin extends Omit<BookingDB, '_id' | 'vehicle_id'> {
  _id: string
  vehicle: ServerVehicleResponse
}

export interface BookingResponse extends Omit<BookingDB, '_id' | 'vehicle_id'> {
  _id: string
  vehicle_id: string
}