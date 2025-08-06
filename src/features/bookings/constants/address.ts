import { SelectOptions } from "@/types";
import { TypeAddress } from "@/features/bookings";

export const AddressTypesData: SelectOptions<TypeAddress>[] = [
  { id: 1, value: 'casa' },
  { id: 2, value: 'oficina' },
  { id: 3, value: 'depto' }
]