const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name of the product'],
        minLength: 1,
        maxLength: 30
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide the image url']
    },
    profitMargin: {
        type: Number,
        required: [true, 'Please provide the profit margin']
    },
    price: {
        type: Number,
        required: [true, 'Please provide the price']
    },
    productionProcessId: {
        type: mongoose.Types.ObjectId,
        ref: 'productionProcess',
        required: true
    }
})

module.exports = mongoose.model('Product', ProductSchema)