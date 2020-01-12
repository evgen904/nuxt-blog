// защита роутов, к примеру добавление, редактирование поста
const passport = require('passport')

// экспорт роута из экспресса
const {Router} = require('express')

// middlewaer для файлов (картинок)
const upload = require('../middlewaer/upload')

// подкл. контроллер
const ctr = require('../controllers/post.controller')

const router = Router()

// Admin, должны защищаться passport-ом
// /api/post/admin

// используем rest Api
// post - создание (поста)
router.post(
  '/admin/',
  // passport.authenticate - проверка наличия токена
  passport.authenticate('jwt', {session: false}),
  // название берем из - /store/post/ actions - create, FormData - fd.append('image', image, image.name)
  upload.single('image'),
  ctr.create
)

// get - получение (поста)
router.get(
  '/admin/',
  passport.authenticate('jwt', {session: false}),
  ctr.getAll
)

router.get(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  ctr.getById
)

// put - изменение (поста)
router.put(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  ctr.update
)

// delete - удаление (поста)
router.delete(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  ctr.remove
)

// Base - публичные инпоинты
// /api/post

// ctr.getAll - подкл. методы
router.get('/', ctr.getAll)
router.get('/:id', ctr.getById)
router.put('/:id', ctr.addView)

module.exports = router