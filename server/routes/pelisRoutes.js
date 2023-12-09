const express = require('express')
const router = express.Router()
const pelisControllers = require('../controllers/pelisControllers')

router.get('/',pelisControllers.Hero_get)

module.exports = router