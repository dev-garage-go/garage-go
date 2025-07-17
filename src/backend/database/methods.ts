// methods.ts

import { connectDatabase } from "./connect"
import type { Collection } from "mongodb"
import { BookingDB, ServiceDB, VehicleDB } from "./types"
import { FinalOrderType } from "./schemas"

type CollectionMap = {
  vehicles: VehicleDB
  bookings: BookingDB
  services: ServiceDB
  orders: FinalOrderType
}

export const getCollection = async <K extends keyof CollectionMap>(
  name: K
): Promise<Collection<CollectionMap[K]>> => {
  const db = await connectDatabase()
  if (!db) throw new Error('Error connecting database')

  const col = db.collection<CollectionMap[K]>(name)
  if (!col) throw new Error("The collection doesn't exist")
  return col
}
