const Word = require('../models/Word')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


// @desc get all words
// @route GET /words
// @access Private

const getAllWords = asyncHandler( async (req, res) => {
    const words = await Word.find().lean()

    if (!words?.length) {
        return res.status(400).json({message: 'No words found'})
    }

    res.json(words)
})

// @desc create new word
// @route PAST /words
// @access Private

const createWord = asyncHandler( async (req, res) => {
    const {word, category} = req.body

    if ( !word || !category ) {
        res.status(400).json({message: 'Some fields are empty'})
    }

    const duplicate = await Word.findOne({word}).lean()

    if (duplicate) {
        res.status(409).json({message: `Word ${word} already exists`})
    }

    const newWord = await Word.create({word, category})

    if (newWord){
        res.status(201).json({message: `Word ${word} added`})
    }
    else {
        res.status(400).json({message: 'Invalid word data'})
    }
})

// @desc update a word
// @route PATCH /word
// @access Private

const updateWord = asyncHandler( async (req, res) => {
    const {id, word, category} = req.body
    
    if ( !id || !username || !category) {
        res.status(400).json({message: 'All fields required'})
    }

    const wordDoc = await Word.findById(id).exec()

    if (!wordDoc) {
        res.status(400).json({message: 'Word not found'})
    }

    const duplicate = await Word.findOne({word}).lean()

    if(duplicate && (duplicate?._id.toString() !== id)) {
        res.status(409).json({message: `Duplicate word`})
    }

    wordDoc.word = word
    wordDoc.category = category
    
    await wordDoc.save()

    res.json({message: `Word ${word} updated`})
})

// @desc delete word
// @route DELETE /word
// @access Private

const deleteWord = asyncHandler( async (req, res) => {
    const {id} = req.body
    if (!id) {
        return res.status(400).json({message: 'Word not found'})
    }

    const wordDoc = Word.findById(id).exec()

    await wordDoc.deleteOne()

    res.json({message: `Word ${wordDoc.word} deleted`})
})

module.exports = {
    getAllWords,
    createWord,
    updateWord,
    deleteWord,
}