export interface DetailServiceOptions {
  detailName: string,
  detailPrice: number
  selected?: boolean
}

export interface ExtraServices {
  name: string,
  price: number,
  details?: {
    mainOptions: DetailServiceOptions[],
    switchOptions: DetailServiceOptions[]
  }
}