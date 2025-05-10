export interface DetailServiceOptions {
  detailName: string,
  detailPrice: number
}

export interface ExtraServices {
  name: string,
  price: number,
  details?: {
    mainOptions: DetailServiceOptions[],
    switchOptions: DetailServiceOptions[]
  }
}