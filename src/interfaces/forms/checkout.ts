import { Dayjs } from 'dayjs';

export type ServicesNames = 'mileage_maintenance' | 'tires_change'
export type ServicesTypes = 'mileage' | 'tires'

export const TypeServicesMap: Record<ServicesNames, ServicesTypes> = {
  "mileage_maintenance": "mileage",
  "tires_change": "tires"
}

export type CheckoutFormData = {
  services: {
    name: ServicesNames,
    type: ServicesTypes,
  },
  user: {
    name: string;
    lastName: string;
    phone: string;
    email: string;
    address: string,
    typeAddress: '' | 'casa' | 'oficina' | 'depto'
    additionalInfo?: string
  },
  vehicle: {
    licensePlate: string
    brand: string;
    model: string;
    mileage: string;
    year: number;
  },
  appointment: {
    date: Dayjs,
    time: string,
  }
}