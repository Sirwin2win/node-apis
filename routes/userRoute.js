const express = require('express')
const { register, login, getAllUsers,updateUser } = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()



router.post('/register',register)
router.post('/login',login)
router.get('/',protect,getAllUsers)
router.put('/:id',protect,updateUser)

module.exports = router