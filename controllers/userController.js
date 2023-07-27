const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


// @desc get all users
// @route GET /users
// @access Private

const getAllUsers = asyncHandler( async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users?.length) {
        return res.status(400).json({message: 'No users found'})
    }
    res.json(users)
})

// @desc create new user
// @route POST /users
// @access Private

const createUser = asyncHandler( async (req, res) => {
    const {username, password} = req.body

    if ( !username || !password ) {
        res.status(400).json({message: 'Some fields are empty'})
    }

    const duplicate = await User.findOne({username}).lean()

    if (duplicate) {
        res.status(409).json({message: `User ${username} already exists`})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const userObject = {username, 'password': hashedPassword}

    const user = await User.create(userObject)

    if (user){
        res.status(201).json({message: `New user ${username} created`})
    }
    else {
        res.status(400).json({message: 'Invalid user data'})
    }
})

// @desc get all users
// @route PATCH /users
// @access Private

const updateUser = asyncHandler( async (req, res) => {
    const {id, username, password} = req.body
    
    if ( !id || !username ) {
        res.status(400).json({message: 'Username can not be empty'})
    }

    const user = await User.findById(id).exec()

    if (!user) {
        res.status(400).json({message: 'User not found'})
    }

    const duplicate = await User.findOne({username}).lean().exec()

    if(duplicate && (duplicate?._id.toString() !== id)) {
        res.status(409).json({message: `Duplicate username`})
    }

    user.username = username

    if (password) {
        user.password = await bcrypt.hash(password, 10)
    }

    await user.save()

    res.json({message: `User ${username} updated`})

})

// @desc delete user
// @route DELETE /users
// @access Private

const deleteUser = asyncHandler( async (req, res) => {

    const {id} = req.body

    if (!id) {
        return res.status(400).json({message: 'User not found'})
    }

    const user = await User.findById(id).exec()

    await user.deleteOne()

    res.json({message: `User ${user.username} deleted`})
})

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
}