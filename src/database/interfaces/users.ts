export interface User {
  name: string
  lastname: string
  email: string
  phone: string
  address: string
  typeAddress: 'casa' | 'oficina' | 'depto'
  additionAddressInfo?: string
}
