const express = require('express')
const app = express()
const port = 4001
const router = require('./router/movieRouter')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})