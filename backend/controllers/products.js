require("dotenv").config();
const productsRouter = require('express').Router()
const Product = require('../models/product')
const Comment = require('../models/comments')
const axios = require('axios')

const client = axios.create({
    headers: {
      Authorization: "Bearer " + process.env.OPEN_API_KEY,
    },
  });

productsRouter.get('/', async (request, response)=>{
    const products = await Product.find({}).populate('comments')
    response.json(products)
})

productsRouter.get('/chat', async (request, response)=>{
    const description = request.body.description
    const products = await Product.find({}, {price:0, specification: 0, rating: 0, comments: 0,
    _id: 0, __v: 0})
    const params = {
        messages: [{"role": "user", "content": `find the most likely item from this json list - ${products} based
        on this description - ${description}`}],
        model: "gpt-3.5-turbo",
      };
      client
      .post("https://api.openai.com/v1/chat/completions", params)
      .then((result) => {
        response.json(result.data.choices[0].message.content);
      })
      .catch((err) => {
        console.log(err);
      });
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
        imageUrl: body.imageUrl,
        rating: body.rating,
        price: body.price,
        department: body.department,
        category: body.category,
        brand: body.brand,
        subcategory: body.subcategory,
        specification: body.specification,
        weight: body.weight,
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