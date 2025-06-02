import { Hour } from "@/features/bookings";

export interface Appointment {
  date: string, // ISO 8601 string
  time: Hour
}