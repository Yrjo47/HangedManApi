const express = require('express')
const router = express.Router()
const wordController = require('../controllers/wordController')

router.route('/')
    .get(wordController.getAllWords)
    .post(wordController.createWord)
    .patch(wordController.updateWord)
    .delete(wordController.deleteWord)

module.exports = router