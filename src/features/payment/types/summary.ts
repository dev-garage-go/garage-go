export interface PaymentSummaryButton {
  text: string,
  onClick?: () => void
}
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
  button: PaymentSummaryButton
}

export interface SummaryInstanceProps {
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
}