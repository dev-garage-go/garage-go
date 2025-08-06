import { ServicesNames, ServicesTypes } from "../types/services-data";

// export const ServiceNamesMap: Record<ServicesNames, string> = {
//   "mileage_maintenance": "mantención por kilometraje",
//   "tires_change": "cambio de neumaticos"
// } as const

export const ServiceTypesMap: Record<ServicesTypes, string> = {
  "mileage": "mantención por kilometraje",
  "tires": "cambio de neumaticos"
} as const