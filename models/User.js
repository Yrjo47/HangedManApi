const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    gamesPlayedPVE: {
        type: Number,
        default: 0,
    },
    gamesPlayedPVP: {
        type: Number,
        default: 0,
    },
    gamesWonPVE: {
        type: Number,
        default: 0,
    },
    gamesWonPVP: {
        type: Number,
        default: 0,
    },
})

module.exports = mongoose.model('User', userSchema)