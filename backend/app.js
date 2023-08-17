require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const productsRouter = require('./controllers/products') 

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.error('error connecting to MongoDB',
            error.message)
    })

app.use(express.json())
app.use('/api/products', productsRouter)

module.exports = app