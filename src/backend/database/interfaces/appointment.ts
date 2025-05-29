import { Hour } from "@/components";

export interface Appointment {
  date: string, // ISO 8601 string
  time: Hour
}