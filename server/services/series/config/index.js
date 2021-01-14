const { MongoClient } = require('mongodb')
const url = "mongodb://localhost:27017"
const client = new MongoClient(url , {useUnifiedTopology: true})
const dataBaseName = 'series_database'
client.connect()

const db = client.db(dataBaseName)

module.exports = db