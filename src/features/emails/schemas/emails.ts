import { z } from "zod";

export const OrderEmailSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  secure_token: z.string().uuid(),
  service_name: z.string()
})
export type OrderEmailType = z.infer<typeof OrderEmailSchema>