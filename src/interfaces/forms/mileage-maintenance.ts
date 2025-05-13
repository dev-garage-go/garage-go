import { Dayjs } from 'dayjs';

export type MileageCheckoutFormInputs = {
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
    licensePlate?: string
    carBrand: string;
    carModel: string;
    carKm: string;
    carYear: number;
  },
  booking: {
    serviceName: string,
    date: Dayjs,
    time: string,
    extraOptions?: {}
  }
}