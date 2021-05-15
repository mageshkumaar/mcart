const express = require('express')
const userController = require('../controllers/user')

const router = express.Router()

router.post('/', userController.create)
router.get('/{id}', userController.get)
router.post('/{id}', userController.update)
router.delete('/{id}', userController.remove)

module.exports = router