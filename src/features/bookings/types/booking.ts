import { Dayjs } from 'dayjs';
import { Hour } from './schedules';
import { ServicesDataType } from '@/features/services';
import { licensePlateType } from '@/features/vehicle';
import { ObjectId } from 'mongodb';

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
  vehicleID: ObjectId,
  appointment: Appointment
  amount: AmountInterface
}

// ? Many services
// export interface BookingServicesDataInterface {
//   services: ServicesDataType[],
//   user: UserInterface,
//   vehicle: VehicleDataInterface,
//   appointment: Appointment
//   amount: AmountInterface
// }
