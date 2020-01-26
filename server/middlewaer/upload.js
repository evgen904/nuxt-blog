// для работы с путями
const path = require('path')

// для загрузки файлов
const multer = require('multer')

// для работы с датами, в node не принципиально колличество npm пакетов
const moment = require('moment')

const storage = multer.diskStorage({
  // место куда ложим файл когда он загрузится, принимает три параметра
  destination(req, file, cb) {
    // в nodeJs в функциях первый параметр указывается номер ошибки, т.к. ее нет пишем null
    // path - указываем путь куда положем картинку, __dirname - текущая директория
    cb(null, path.resolve(__dirname, '../../', 'static'))
  },
  filename(req, file, cb) {
    // moment - текущая дата
    // ${moment().format('DDMMYYYY-HHmmss_SSS') создаем хешь чтобы название файлов не повторялось
    cb(null, `${moment().format('DDMMYYYY-HHmmss_SSS')}-${file.originalname}`)
  }
})

// валидируем параметры у файлов
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype == 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = multer({
  storage, fileFilter, limits: {fileSize: 1024 * 1024 * 5}
})