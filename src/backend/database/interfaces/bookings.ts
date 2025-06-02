import { BookingServiceDataInterface } from "@/features/bookings"

export interface BookingDB extends BookingServiceDataInterface {
  _id: string
  price: number
}