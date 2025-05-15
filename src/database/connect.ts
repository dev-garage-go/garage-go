import { Db, MongoClient } from "mongodb"

const dbURI = process.env.DATABASE_URI
const dbName = process.env.DATABASE_NAME

const uri = dbURI || 'mongodb://localhost:27017' // cambiar en prod
const client = new MongoClient(uri)

// evita que 
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}

export const connectDatabase = async (): Promise<Db> => {
  await client.connect()
  const db = client.db(dbName)
  return db
}
