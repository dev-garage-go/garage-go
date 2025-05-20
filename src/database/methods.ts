// methods.ts

import { connectDatabase } from "./connect"
import type { Document, Collection } from "mongodb"

export type Collections = (
  'bookings' | 'coupons' | 'services' | 'promotions'
)

export const getCollection = async <T extends Document = Document>(
  name: Collections
): Promise<Collection<T>> => {
  const db = await connectDatabase()
  if (!db) throw new Error('Error connecting database')

  const col = db.collection<T>(name)
  if (!col) throw new Error("The collection doesn't exist")
  return col
}
