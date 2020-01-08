const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require('./keys')
const app = express()

mongoose.connect('mongodb://evgeniy:q123456@cluster0-shard-00-00-kmq61.mongodb.net:27017,cluster0-shard-00-01-kmq61.mongodb.net:27017,cluster0-shard-00-02-kmq61.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.log(error))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// module.exports экспортируем переменную app на ружу
module.exports = app