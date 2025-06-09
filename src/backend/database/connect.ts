// lib/mongodb.ts
import { MongoClient, Db } from 'mongodb'

const uri = process.env.DATABASE_URI || 'mongodb://localhost:27017'
const dbName = process.env.DATABASE_NAME

console.log("✅ URI DB: ", uri)
console.log("✅ DB_NAME: ", dbName)

if (!uri) {
  throw new Error(`Database URI Key not founded in process.env.DATABASE_URI: ${uri}`)
}

if (!dbName) {
  throw new Error(`Database Name Key not founded in process.env.DATABASE_NAME: ${dbName}`)
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// avoids multiple database connections
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export const connectDatabase = async (): Promise<Db> => {
  const client = await clientPromise
  return client.db(dbName)
}
