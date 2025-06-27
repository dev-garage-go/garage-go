import { Appointment, UserInterface } from "@/features/bookings";
import { VehicleWithStringIDInterface } from "@/features/vehicle";

export type ServiceStates = "a ingresar" | "mantenimiento" | "finalizado"

export interface DataServiceStateChanged {
  appointment: Appointment;
  user: Omit<UserInterface, 'additionalInfo' | 'typeAddress'>;
  vehicle: Omit<VehicleWithStringIDInterface, '_id'>;
  service: {
    name: string,
    state: ServiceStates
  };
}