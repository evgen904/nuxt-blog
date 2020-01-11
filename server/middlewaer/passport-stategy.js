const {Strategy, ExtractJwt} = require('passport-jwt')

// подкл. модель пользователя, берем метод у монгуса
const {model} = require('mongoose')

// берем JWT секретный ключ
const keys = require('../keys')

// создаем модель User, из коллекции
const User = model('user')

// jwtFromRequest указываем каким образом будет считывать JWT токен(где он находится)
// с фронта будет отправлять с хедора, возьмем с ExtractJwt
// Authorization: Bearer TOKEN sdfsdfdfg.opiewhrpgnkld;fgh 

// secretOrKey указываем секретный ключ
const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT
}

// формируем саму стратегию, и ее логику экспортируем
// Strategy принимает 2 параметра payload, done
// обращаемся к БД
module.exports = new Strategy(option, async (payload, done) => {
  try {
    // находим пользователя, есть ли пользователь с таким токеном (проверить на валидность)
    // payload берет с контроллера auth.controller.js
    // через метод select забираем только id, чтобы в дальнейшем проверить
    const canditate = await User.findById(payload.userId).select('id')

    if (canditate) {
      // токен валидный, все нормально
      done(null, canditate)
    } else {
      // запрещаем авторизацию, для необходимого роута (валидация токена не прошла)
      done(null, false)
    }
  } catch(e) {
    console.error(e)
  }
})