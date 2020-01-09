// реализация матода login

const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')

// ключ для токена
const keys = require('../keys')

// для начала импортируем модель юзера, User(с большой буквы пишем, т.к. модель)
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
  // обращение к БД (через асинхронный метод)
  // получаем пользователя, которые передавали в поле request(login? password)
  // candidate положим пользователя, пока не известно найден или нет
  // findOne ищем одного пользователя, для оптимизации, в который передаем объект конфигурации, 
  // искать будем по параметру login
  // в качестве значения будем указывать req.body.login(то куда попадают параметры при обращении сервера)
  const candidate = await User.findOne({login: req.body.login})

  // проверяем есть ли пользватель,
  // если нет, то используем объект respons(ответ)
  // и ставим статус 404, т.е. не найдено, которую обраьбоаем локально на фронтенде
  // через метод json укажем об ошибке
  if (candidate) {
    // убидились что он есть, проверяем его пароль
    // пароль в открытом виде не храним, шифруем через bcrypt-nodejs
    // jsonwebtoken - для получения токена  

    // req.body.password передаем пароль с фронта (не зашифрованный)
    // вторым параметром передаем тот пароль который есть в базе candidate.password
    // compareSync вернет булево значение
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)

    if (isPasswordCorrect) {
      // если все верно сгенерируем токент, и отправим его на фронтенд
      // sign 1й параметр - указываем какие поля хотим зашифровать в токене (логин и id)
      // 2й параметр - специальный ключ который зашифруем keys.JWT
      // 3й параметр - указываем сколько будет жить каждый токен по времени 60*60 = 1час
      const token = jwt.sign({
        login: candidate.login,
        userId: candidate._id
      }, keys.JWT, {expiresIn: 60 * 60})

      // res.json({token}) отправляем обратно пользователю
      // по умолчанию статус 200 (можно не писать)
      res.json({token})

    } else {
      // иначе вернем сообщение об ошибке объекту res
      // status 401 есть ошибка в авторизации
      res.status(401).json({message: 'Пароль неверен'})
      // для реальных приложений лучше использовать статус 404, 
      // чтобы злоумышленик не понял, есть ли такой пользователь
    }


  } else {
    res.status(404).json({message: 'Пользователь не найден'})
  }
}

module.exports.createUser = (req, res) => {

}