const mongoose = require('mongoose')


const MaterialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name of the material'],
        minLength: 1,
        maxLength: 30
    },
    amount: {
        type: Number,
        required: [true, 'Please provide amount of the material']
    },
    minimumAmount: {
        type: Number,
        required: [true, 'Please provide minimum amount of the material']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price of the material']
    },
    unitOfMeasurement: {
        type: String,
        required: [true, 'Please provide the unit of measurement']
    },
    isUsed: {
        type: Boolean
    },
    supplierId: {
        type: mongoose.Types.ObjectId,
        ref: 'supplier',
        required: true
    }
})

module.exports = mongoose.model('Material', MaterialSchema)