const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/userControllers')
const passport = require('passport')
require('../config/passport')


router.post('/signup',userControllers.signup_post)

router.get('/signup',userControllers.signup_get)

router.post('/signin',userControllers.signin_post)    

router.get('/failuresignin',userControllers.failuresignin_get)

router.get('/signin',userControllers.signin_get)



module.exports = router