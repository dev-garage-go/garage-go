import { Hour } from '@/interfaces';

export interface Appointment {
  date: string, // ISO 8601 string
  time: Hour
}