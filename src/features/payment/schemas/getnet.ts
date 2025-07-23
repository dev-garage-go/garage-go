import { z } from "zod"
import { zObjectIdSchema } from "@/utils/zod-helpers"

// Access Token
export const GetnetAuthTokenSchema = z.object({
  token_type: z.literal("Bearer"),
  expires_in: z.string(),
  access_token: z.string(),
  refresh_token: z.string()
})
export type GetnetAuthTokenType = z.infer<typeof GetnetAuthTokenSchema>

// Tokenization
export const GetnetTokenizationRequestSchema = z.object({
  user_card_number: z.string(),
  user_email: z.string().email(),
  user_order_id: zObjectIdSchema
})
export type GetnetTokenizationRequestType = z.infer<typeof GetnetTokenizationRequestSchema>

export const TokenReturnedSchema = z.object({
  number_token: z.string()
})
export type TokenReturnedType = z.infer<typeof TokenReturnedSchema>

// Payment
export const PaymentParamsSchema = z.object({
  userEmail: z.string().email(),
  userOrderId: zObjectIdSchema,
  amount: z.number(),
  cardNumber: z.string(),
  return_url: z.string().optional(),      // Webpay needs a return url to send a POST request and redirect to user
  sessionId: z.string().optional(),      // Webpay needs it
  cardHolderName: z.string(),
  expirationMonth: z.string(),
  expirationYear: z.string(),
  securityCode: z.string(),
  customerId: z.string()
})
export type PaymentParamsType = z.infer<typeof PaymentParamsSchema>

export const GetnetCreditPaymentResponseSchema = z.object({
  payment_id: z.string().uuid(),
  status: z.enum(["APPROVED", "DECLINED", "CANCELLED", "AUTHORIZED", "DENIED"]),
  seller_id: z.string().uuid(),
  amount: z.number(),
  currency: z.enum(["BRL", "USD", "ARS"]),
  order_id: z.string(),
  authorization_code: z.string(),
  authorized_at: z.string().datetime(),
  terminal_nsu: z.string(),
  brand: z.string(), // o z.enum(["Visa", "Mastercard", "Amex", ...])
  number_masked: z.string().regex(/^\d{6}\*{6}\d{4}$/)
})
export type GetnetCreditPaymentResponseType = z.infer<typeof GetnetCreditPaymentResponseSchema>
