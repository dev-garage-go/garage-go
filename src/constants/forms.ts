import { SelectOptions } from "@/components";
import { TypesTiresOptions } from "@/features/services";

export const AddressTypes: SelectOptions[] = [
  { id: 1, value: 'casa' },
  { id: 2, value: 'oficina' },
  { id: 3, value: 'depto' }
]

export const TypesTires: { label: string; value: TypesTiresOptions }[] = [
  { label: 'Ciudad', value: 'ciudad' },
  { label: 'Offroad', value: 'offroad' },
  { label: 'Intermedio', value: 'intermedio' }
]
