export type PaymentGatewayMethods = | 'mercado-pago' | 'getnet' | 'webpay' | undefined

export interface PaymentMethodsOptionsInterface {
  method: PaymentGatewayMethods,
  name: string,
  description: string,
  imageSrc: string
}
