type PaymentMethods = '' | 'mercado-pago' | 'getnet' | 'webpay'

interface PaymentMethodsOptions {
  method: PaymentMethods,
  name: string,
  description: string,
  imageSrc: string
}
