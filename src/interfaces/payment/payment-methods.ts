export type PaymentGatewayMethods = | 'mercado-pago' | 'getnet' | 'webpay' | undefined

export interface PaymentMethodsOptions {
  method: PaymentGatewayMethods,
  name: string,
  description: string,
  imageSrc: string
}
