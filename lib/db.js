const { MongoClient } = require('mongodb')
const { DB_HOST, DB_PORT, DB_NAME } = process.env
const mongoUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
let instance
let client

async function connectDB () {
  if (instance) return instance

  try {
    client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true })
    instance = client.db(DB_NAME)
  } catch (error) {
    console.error('Could not connect to db', mongoUrl, error)
    process.exit(1)
  }

  return instance
}

module.exports = connectDB
