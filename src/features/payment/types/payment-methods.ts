export type PaymentGatewayMethodsType = | 'mercado-pago' | 'getnet' | 'webpay' | undefined

export interface PaymentGatewayMethodsOptionsInterface {
  method: PaymentGatewayMethodsType,
  name: string,
  description: string,
  imageSrc: string
}

export interface UserCardInterface {
  cardNumber: string
  ownerName: string
  expiresIn: string
  cvv: string
}

export interface PaymentFormSchema {
  methodSelected?: 'user-card' | 'payment-gateway'
  userCard?: UserCardInterface
  paymentGateway?: PaymentGatewayMethodsType
  checkTermsAndConditions: boolean
}