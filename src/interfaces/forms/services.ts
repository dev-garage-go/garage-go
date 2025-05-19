export type ServicesNames = 'mileage_maintenance' | 'tires_change'
export type ServicesTypes = 'mileage' | 'tires'

export const TypeServicesMap: Record<ServicesNames, ServicesTypes> = {
  "mileage_maintenance": "mileage",
  "tires_change": "tires"
}