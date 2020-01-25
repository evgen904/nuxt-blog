const passport = require('passport')
const {Router} = require('express')
const {login, createUser} = require('../controllers/auth.controller')
const router = Router()


// restApi: 
// post - для создания элементов
// get - для получения элементов
// put - для редактирования
// delete - для удаления

// /api/auth/admin/login
router.post('/admin/login', login)

// /api/auth/admin/create

// passport изначально не добавили т.к. не было в БД пользователя
router.post(
  '/admin/create', 
  passport.authenticate('jwt', {session: false}),
  createUser  
)

module.exports = router
