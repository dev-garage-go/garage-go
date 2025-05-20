import { connectDatabase } from "./connect"

export type Collections = (
  'bookings' | 'coupons' | 'services' | 'promotions'
)

export const getCollection = async (name: Collections) => {
  const db = await connectDatabase()
  if (!db) throw new Error('Error connecting database')

  const col = db.collection(name)
  if (!col) throw new Error("The collection doens't exist")
  return col
}