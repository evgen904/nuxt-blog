// в модели создаем схему, которую в регистрируем в монгузе, после чего работаем с mongoose

// функция model для регистрации коллекции
// класс Schema для создания схемы, нужной нам сущности
const {model, Schema} = require('mongoose')

// поля для каждого пользователя: login, password
const userSchema = new Schema({
  // тип - строка, 
  // unique - чтобы поле было уникальным, 
  // required - без логина существование пользователя не возможно, 
  // minLength - минимальная длина которую указали на фронтенде
  login: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
})

// экспортируем наружу, результат работы функции model, где регистрируем модель(коллекцию) 'users', и также передаем схему 'userSchema' 
module.exports = model('users', userSchema)