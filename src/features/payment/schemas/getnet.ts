import { z } from "zod"
import { zObjectIdSchema } from "@/utils/zod-helpers"

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