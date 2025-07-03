import { z } from 'zod'

// -----------------------------
// Preference
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


// -----------------------------
// WebHook - objects sent from MP

// Payment
export const SimplifiedPaymentMPValidator = z.object({
  id: z.number(),
  status: z.string(), // approved, pending, etc.
  status_detail: z.string(),
  date_approved: z.string().nullable(),
  transaction_amount: z.number(),
  currency_id: z.string(),

  payer: z.object({
    id: z.string(),
    email: z.string().email(),
    first_name: z.string().nullable(),
    last_name: z.string().nullable(),
  }),

  payment_method: z.object({
    id: z.string(),
    type: z.string(), // credit_card, etc.
    issuer_id: z.string()
  }),

  installments: z.number(),
  description: z.string(),
  external_reference: z.string(),

  order: z.object({
    id: z.string(),
    type: z.string()
  }).nullable(),

  transaction_details: z.object({
    total_paid_amount: z.number(),
    net_received_amount: z.number(),
    installment_amount: z.number()
  })
})


// Merchant Order
export const MerchantOrderMPValidator = z.object({
  id: z.number(),
  status: z.string(),
  external_reference: z.string(),
  preference_id: z.string(),
  payments: z.array(
    z.object({
      id: z.number(),
      transaction_amount: z.number(),
      total_paid_amount: z.number(),
      shipping_cost: z.number(),
      currency_id: z.string(),
      status: z.string(),
      status_detail: z.string(),
      operation_type: z.string(),
      date_approved: z.string(),
      date_created: z.string(),
      last_modified: z.string(),
      amount_refunded: z.number()
    })
  ),
  shipments: z.array(z.unknown()),
  payouts: z.array(z.unknown()),
  collector: z.object({
    id: z.number(),
    email: z.string(),
    nickname: z.string()
  }),
  marketplace: z.string(),
  notification_url: z.string(),
  date_created: z.string(),
  last_updated: z.string(),
  sponsor_id: z.null(),
  shipping_cost: z.number(),
  total_amount: z.number(),
  site_id: z.string(),
  paid_amount: z.number(),
  refunded_amount: z.number(),
  payer: z.object({ id: z.number(), email: z.string() }),
  items: z.array(
    z.object({
      id: z.string(),
      category_id: z.string(),
      currency_id: z.string(),
      description: z.string(),
      picture_url: z.null(),
      title: z.string(),
      quantity: z.number(),
      unit_price: z.number()
    })
  ),
  cancelled: z.boolean(),
  additional_info: z.string(),
  application_id: z.null(),
  is_test: z.boolean(),
  order_status: z.string()
})
