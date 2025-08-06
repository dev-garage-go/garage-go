import { Dayjs } from 'dayjs';
import { UserInterface } from './user';
export type Hour = '9:00' | '11:00' | '13:00' | '15:00' | '17:00'

export interface Schedules {
  hour: Hour
}

export interface AppointmentDate {
  date: Dayjs,
  time: Hour
}

export interface UserAppointment {
  user: UserInterface
  appointment: AppointmentDate
}