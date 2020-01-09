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
router.post('/admin/create', createUser)

module.exports = router
