export interface SummaryProps {
  mainService: {
    name: string,
    description: string,
    hasPrice: boolean,
    price: number,
    referenceValue: string,
  }
  secundaryService?: {
    name: string,
    description: string,
    price: number,
  }
  coupon: {
    hasCoupon: boolean,
    number?: string,
  }
  summary: {
    subtotal: number,
    dctos: number,
    total: number,
    btnString: string,
    btnAction?: () => void
  }
}