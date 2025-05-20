import { Services } from '@/database/interfaces';
import { Dayjs } from 'dayjs';
import { VehicleData } from './vehicle';
import { Hour } from './schedules';

interface User {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  address: string,
  typeAddress: '' | 'casa' | 'oficina' | 'depto'
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

export interface BookingServicesData {
  services: Services[],
  user: User,
  vehicle: VehicleData,
  appointment: Appointment
}

export interface BookingServiceData {
  service: Services,
  user: User,
  vehicle: VehicleData,
  appointment: Appointment
}