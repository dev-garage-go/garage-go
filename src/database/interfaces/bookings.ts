import { BookingServiceData } from "@/interfaces"

export interface BookingDB extends BookingServiceData {
  _id: string
  price: number
}