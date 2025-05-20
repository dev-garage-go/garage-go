export type PaymentGatewayMethods = | 'mercado-pago' | 'getnet' | 'webpay' | undefined

export interface PaymentGatewayMethodsOptionsInterface {
  method: PaymentGatewayMethods,
  name: string,
  description: string,
  imageSrc: string
}

export interface UserCard {
  cardNumber: string
  ownerName: string
  expiresIn: string
  cvv: string
}

export interface PaymentFormSchema {
  methodSelected?: 'user-card' | 'payment-gateway'
  userCard?: UserCard
  paymentGateway?: PaymentGatewayMethods
  checkTermsAndConditions: boolean
}