const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))




// module.exports экспортируем переменную app на ружу
module.exports = app