import { z } from "zod"

/** Zod string que debe ser una fecha ISO válida (ej: 2025-07-10T23:00:00.000Z) */
export const zISOString = z.string().refine((val) =>
  !isNaN(Date.parse(val)), {
  message: "Debe ser una fecha ISO válida",
})

/** Zod string que debe ser un formato de ObjectID **/
export const zObjectIdSchema = z.string().refine(val =>
  /^[a-f\d]{24}$/i.test(val), {
  message: "Invalid ObjectId string format"
})