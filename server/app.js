const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// passport защита роута по токену, для авторизации(проверка на валидный токен), если токена нет отдаем ошибку 401
const passport = require('passport')

// passport-jwt для стратегии через авторизацию, по токену
const passportStrategy = require('./middlewaer/passport-stategy')

const authRoutes = require('./routes/auth.routes')
const keys = require('./keys')
const app = express()

mongoose.connect(keys.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.log(error))

// подкл. passport  
app.use(passport.initialize())
// создаем стратегию для плагина passport
passport.use(passportStrategy)


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// регистрация роута для авторизации
app.use('/api/auth', authRoutes)


// module.exports экспортируем переменную app на ружу
module.exports = app