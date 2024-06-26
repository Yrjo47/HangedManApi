const express = require('express')
const router = express.Router()
const path = require('path')
const userController = require('../controllers/userController')

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router