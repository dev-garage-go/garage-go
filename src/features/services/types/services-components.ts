import { VehicleMileages } from "@/features/services";

export interface ButtonProps {
  text: string;
  variant: string;
  icon?: string;
}

export interface ServiceCardInterface {
  title: string,
  price?: number,
  image: string,
  discount?: string,
  features: string[],
  buttons?: ButtonProps[]
  path: string
}

export interface VehicleMileageOptionInterface {
  quantity: VehicleMileages
}

export interface DetailServiceOptionInterface {
  detailName: string,
  detailPrice: number
  selected?: boolean
}

export interface ExtraServiceCardInterface {
  name: string,
  price: number,
  details?: {
    mainOptions: DetailServiceOptionInterface[],
    switchOptions: DetailServiceOptionInterface[]
  }
}

export interface StepsServicePageInterface {
  title: string
  description: string
  imageUrl: string
  imageAlt: string
}