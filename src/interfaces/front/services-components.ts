import { VehicleMileages } from "@/features/services/interfaces/services-data";

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

export interface DetailServiceOptions {
  detailName: string,
  detailPrice: number
  selected?: boolean
}

export interface ExtraServicesCards {
  name: string,
  price: number,
  details?: {
    mainOptions: DetailServiceOptions[],
    switchOptions: DetailServiceOptions[]
  }
}

export interface StepsServicesPagesInterface {
  title: string
  description: string
  imageUrl: string
  imageAlt: string
}