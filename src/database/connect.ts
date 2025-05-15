import { Db, MongoClient } from "mongodb"

const dbURI = process.env.DATABASE_URI
const dbName = process.env.DATABASE_NAME

const uri = dbURI || 'mongodb://localhost:27017' // cambiar en prod
const client = new MongoClient(uri)

export const connectDatabase = async (): Promise<Db> => {
  await client.connect()
  const db = client.db(dbName)
  return db
}
