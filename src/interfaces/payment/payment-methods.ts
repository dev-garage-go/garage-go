export type PaymentMethods = '' | 'mercado-pago' | 'getnet' | 'webpay'

export interface PaymentMethodsOptions {
  method: PaymentMethods,
  name: string,
  description: string,
  imageSrc: string
}
