import { Dayjs } from 'dayjs';

export type MileageMaintenanceFormInputs = {
  user: {
    name: string;
    lastName: string;
    phone: string;
    email: string;
  },
  vehicle: {
    licensePlate?: string
    carBrand: string;
    carModel: string;
    carKm: string;
    carYear: number;
  },
  booking: {
    serviceId: string,
    serviceName: string,
    date: Dayjs,
    time: string,
    extraOptions?: {}
  }
}