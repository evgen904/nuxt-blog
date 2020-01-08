const express = require('express')
const bodyParser = require('body-parser')
const keys = require('./keys')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



// module.exports экспортируем переменную app на ружу
module.exports = app