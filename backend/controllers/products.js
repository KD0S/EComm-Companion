const productsRouter = require('express').Router()
const Product = require('../models/product')
const Comment = require('../models/comments')

productsRouter.get('/', async (request, response)=>{
    const products = await Product.find({}).populate('comments',
        { name: 1, rating: 1})
    response.json(products)
})

productsRouter.get('/:id', async (request, response, next)=>{
    try {
        const product = await Product.findById(request.params.id)
        if (product) response.json(product)
        else response.status(404).end()
    } catch (exception) {
        next(exception)
    }
})

productsRouter.post('/', async (request, response)=>{
    const body = request.body

    const product = new Product({
        name: body.name,
        rating: body.rating
    })
    
    const savedProduct = await product.save()
    response.json(savedProduct)
})

productsRouter.delete('/:id', (request, response, next)=>{
    Product.findByIdAndRemove(request.params.id).then(() => 
        response.status(204).end()
    ).catch(error => next(error))
})

productsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const product = {
        name: body.name,
        rating: body.rating
    }

    Product.findByIdAndUpdate(request.params.id, product, 
        { new: true, runValidators: true, context: 'query'})
        .then(updatedProduct => response.json(updatedProduct))
        .catch(error => next(error))
})

module.exports = productsRouter