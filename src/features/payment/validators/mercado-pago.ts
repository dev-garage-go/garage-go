import { z } from 'zod'

const PaymentMethodSchema = z.object({
  id: z.string()
})

const PaymentTypeSchema = z.object({
  id: z.string()
})

export const PreferenceMPValidator = z.object({
  auto_return: z.string(),
  back_urls: z.object({
    failure: z.string(),
    pending: z.string(),
    success: z.string()
  }),
  binary_mode: z.boolean().optional(),
  client_id: z.string().optional(),
  collector_id: z.number(),
  coupon_code: z.string().nullable().optional(),
  date_created: z.string(),
  external_reference: z.string(),
  id: z.string(),
  init_point: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      category_id: z.string(),
      currency_id: z.string(),
      description: z.string(),
      title: z.string(),
      quantity: z.number(),
      unit_price: z.number()
    })
  ),
  payer: z.object({
    phone: z.object({ area_code: z.string(), number: z.string() }).optional(),
    email: z.string(),
    name: z.string(),
    surname: z.string()
  }),
  payment_methods: z.object({
    excluded_payment_methods: z.array(PaymentMethodSchema).optional(),
    excluded_payment_types: z.array(PaymentTypeSchema).optional(),
    installments: z.number().min(1).max(12).optional()
  }),
  notification_url: z.string().optional(),
  sandbox_init_point: z.string(),
  statement_descriptor: z.string().optional(),
  api_response: z.object({
    status: z.number(),
    headers: z.record(z.string(), z.array(z.unknown()))
  }).optional()
})

export type PreferenceMPType = z.infer<typeof PreferenceMPValidator>