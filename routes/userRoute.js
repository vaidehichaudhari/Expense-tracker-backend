const express = require('express')
const userController = require('../controllers/userController');
const authMiddleware = require('../middlwares/auth')

const router = express.Router();

router.post('/register', userController.registerUser)
router.post('/login', userController.LoginUser)
router.get('/getUserInfo',authMiddleware.auth,userController.getUserInfo)


module.exports = router