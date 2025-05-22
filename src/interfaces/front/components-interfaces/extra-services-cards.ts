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