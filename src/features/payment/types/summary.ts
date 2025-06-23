export interface SummaryButton {
  text: string,
  onClick?: () => void
}

export interface SummaryPaymentOpts {
  hasCompletedPaymentData: boolean,
  errorBothMethods: boolean
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
  button: SummaryButton,
  payment?: SummaryPaymentOpts
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