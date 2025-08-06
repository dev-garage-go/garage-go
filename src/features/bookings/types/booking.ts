import { Dayjs } from 'dayjs';
import { Hour } from './schedules';
import { ServicesDataType } from '@/features/services';

export type TypeAddress = 'casa' | 'oficina' | 'depto'

export interface UserInterface {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  address: string,
  typeAddress: TypeAddress
  additionalInfo?: string
}

export interface AppointmentDate {
  date: Dayjs,
  time: Hour
}

export interface UserAppointment {
  user: UserInterface
  appointment: AppointmentDate
}

export interface AmountInterface {
  subtotal: number
  disscount: number
  total: number
}

// Only one service
export interface BookingInterface {
  service: ServicesDataType,
  user: UserInterface,
  vehicle_id: string,  // al guardarlo en localstorage el Mongo ObjectID se convierte automaticamente en string
  appointment: AppointmentDate
  expires_at: string, // ISO string
  created_at: string  // ISO string
}

export interface BookingResponse extends BookingInterface {
  _id: string
}

// ? Many services
// export interface BookingServicesDataInterface {
//   services: ServicesDataType[],
//   user: UserInterface,
//   vehicle: VehicleDataInterface,
//   appointment: Appointment
//   amount: AmountInterface
// }
