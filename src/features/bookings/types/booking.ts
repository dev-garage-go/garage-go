import { Dayjs } from 'dayjs';
import { Hour } from './schedules';
import { ServicesDataType } from '@/features/services';

export interface UserInterface {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  address: string,
  typeAddress: 'casa' | 'oficina' | 'depto'
  additionalInfo?: string
}

interface Appointment {
  date: Dayjs,
  time: Hour
}

export interface AppointmentDataInterface {
  user: UserInterface
  appointment: Appointment
}

export interface AmountInterface {
  subtotal: number
  disscount: number
  total: number
}

// Only one service
export interface BookingServiceDataInterface {
  service: ServicesDataType,
  user: UserInterface,
  vehicleID: string,  // al guardarlo en localstorage el Mongo ObjectID se convierte automaticamente en string
  appointment: Appointment
  amount: AmountInterface
}

export interface BookingWithStringIDInterface extends BookingServiceDataInterface  {
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
