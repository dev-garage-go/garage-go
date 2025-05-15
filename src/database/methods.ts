import { connectDatabase } from "./connect"

export type Collections = 'bookings'

export const getCollection = async (name: Collections) => {
  const db = connectDatabase()
  const col = (await db).collection(name)
  return col
}