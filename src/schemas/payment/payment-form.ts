import { z } from 'zod'

const userCardSchema = z.object({
  cardNumber: z.string().min(12, 'numero de tarjeta invalido'),
  ownerName: z.string().min(3, 'Nombre requerido'),
  expiresIn: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato MM/YY"),
  cvv: z.string().length(3, 'CVV inválido')
})

const paymentFormSchema = z.object({
  methodSelected: z.optional(z.enum(['user-card', 'payment-gateway'])),
  userCard: z.optional(userCardSchema),
  paymentGateway: z.optional(z.enum(['mercado-pago', 'getnet', 'webpay']))
}).superRefine((data, ctx) => {
  if (data.methodSelected === 'user-card') {
    if (!data.userCard) {
      ctx.addIssue({
        path: ['userCard'],
        code: z.ZodIssueCode.custom,
        message: 'Debe completar los datos de la tarjeta.',
      });
    }
  }

  if (data.methodSelected === 'payment-gateway') {
    if (!data.paymentGateway) {
      ctx.addIssue({
        path: ['paymentGateway'],
        code: z.ZodIssueCode.custom,
        message: 'Debe seleccionar una pasarela de pago'
      })
    }
  }
})

export type PaymentFormData = z.infer<typeof paymentFormSchema>