export type TypeAddress = 'casa' | 'oficina' | 'depto'

export interface UserInterface {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  address: string,
  typeAddress: TypeAddress
  additionalInfo?: string
}