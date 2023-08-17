const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        max: 5
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Product', productSchema)