const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user : {
        type: String,
        required: true
    }, 
    
    comment: {
        type: String,
        required: true
    },

    rating: {
        type: String,
        required: true
    },

    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }
})

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Comment', commentSchema)