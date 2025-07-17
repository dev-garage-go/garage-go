import { Appointment, UserInterface } from "@/features/bookings";
import { ServerVehicleResponse } from "@/features/vehicle";

export type ServiceStates = "a ingresar" | "mantenimiento" | "finalizado"

export interface DataServiceStateChanged {
  appointment: Appointment;
  user: Omit<UserInterface, 'additionalInfo' | 'typeAddress'>;
  vehicle: Omit<ServerVehicleResponse, '_id'>;
  service: {
    name: string,
    state: ServiceStates
  };
}