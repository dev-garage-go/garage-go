import { BookingServiceData } from "@/features/bookings"

export interface BookingDB extends BookingServiceData {
  _id: string
  price: number
}