const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// passport защита роута по токену, для авторизации(проверка на валидный токен), если токена нет отдаем ошибку 401
const passport = require('passport')

// passport-jwt для стратегии через авторизацию, по токену
const passportStrategy = require('./middlewaer/passport-stategy')

const authRoutes = require('./routes/auth.routes')

// подкл. роуты
const postRoutes = require('./routes/post.routes')
const keys = require('./keys')
const app = express()

mongoose.connect(keys.MONGO_URI, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.log(error))

// подкл. passport  
app.use(passport.initialize())
// создаем стратегию для плагина passport
passport.use(passportStrategy)


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// регистрация роута для авторизации, /api/auth - название модуля
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)


// module.exports экспортируем переменную app на ружу
module.exports = app