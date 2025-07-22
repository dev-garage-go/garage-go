import { z } from "zod"

export const GetnetAuthTokenSchema = z.object({
  token_type: z.literal("Bearer"),
  expires_in: z.string(),
  access_token: z.string(),
  refresh_token: z.string()
})
export type GetnetAuthTokenType = z.infer<typeof GetnetAuthTokenSchema>