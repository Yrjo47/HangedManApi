const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI || 'mongodb+srv://admin:okN7GicOz1S4LlXH@cluster0.hpxdmlp.mongodb.net/hangedDB?retryWrites=true&w=majority')
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connectDB