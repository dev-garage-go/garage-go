import { VehicleMileages } from "@/interfaces/shared/services-data";

export interface ButtonProps {
  text: string;
  variant: string;
  icon?: string;
}

export interface ServicesCardsInterface {
  title: string,
  price?: number,
  image: string,
  discount?: string,
  features: string[],
  buttons?: ButtonProps[]
  path: string
}

export interface VehicleMileagesOptions {
  quantity: VehicleMileages
}