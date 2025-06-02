import { Dayjs } from 'dayjs';
import { Hour } from './schedules';
import { VehicleData } from '@/features/vehicle';
import { ServicesDataType } from '@/features/services';

export interface User {
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
  service: ServicesDataType,
  user: User,
  vehicle: VehicleData,
  appointment: Appointment
  amount: Amount
}

// Many services
export interface BookingServicesData {
  services: ServicesDataType[],
  user: User,
  vehicle: VehicleData,
  appointment: Appointment
  amount: Amount
}
