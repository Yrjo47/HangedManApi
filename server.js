const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/cosrOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3001

connectDB()

// app.use(cors(corsOptions))

app.use(express.json())

app.use(express.static('public'))

app.use(require('./routes/root'))
app.use('/users', require('./routes/usersRoute'))
app.use('/words', require('./routes/wordsRoute'))

app.all('*', (req, res) => { 
    res.status(404)
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }
    else if (req.accepts('json')) {
        res.json({message: '404 Not Found'})
    } 
    else {
        res.type('txt').send('404 Not Found')
    }
 })


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
})

mongoose.connection.on('error', err =>{
    console.log(err)
})


