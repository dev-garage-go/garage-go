import { Dayjs } from 'dayjs';
import { VehicleData } from './vehicle';
import { Hour } from '../front/components-interfaces/schedules';
import { ServicesData } from './services-data';

interface User {
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

export interface AppointmentData {
  user: User
  appointment: Appointment
}

export interface Amount {
  subtotal: number
  disscount: number
  total: number
}

// Only one service
export interface BookingServiceData {
  service: ServicesData,
  user: User,
  vehicle: VehicleData,
  appointment: Appointment
  amount: Amount
}

// Many services
export interface BookingServicesData {
  services: ServicesData[],
  user: User,
  vehicle: VehicleData,
  appointment: Appointment
  amount: Amount
}
