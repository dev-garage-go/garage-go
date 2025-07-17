import { BookingServiceDataInterface } from "@/features/bookings"
import { ObjectId } from "mongodb"
import { ServerVehicleResponse } from "@/features/vehicle"

// objeto de como queda la reserva en base de datos, con el vehicle id siendo un ObjectID de Mongo
export interface BookingDB extends Omit<BookingServiceDataInterface, 'vehicle_id'> {
  _id?: ObjectId  // debe ser opcional porque de esa forma mongodb se encarga de crearlo al impactar la db
  vehicle_id: ObjectId
  order_id: ObjectId | null
}

// objeto de como deberian ver los vendedores una reserva, ignorando el vehicleID 
// y viendo el vehiculo
export interface BookingAdmin extends Omit<BookingDB, '_id' | 'vehicle_id' | 'order_id'> {
  _id: string
  vehicle: ServerVehicleResponse
  order_id: string | null
}

export interface BookingResponse extends Omit<BookingDB, '_id' | 'vehicle_id' | 'order_id'> {
  _id: string
  vehicle_id: string
  order_id: string | null
}