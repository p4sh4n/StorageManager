const mongoose = require('mongoose')


const ProductionProcessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name of the production process'],
        minLength: 1,
        maxLength: 30
    },
    startOfProduction: {
        type: Date,
        required: [true, 'Please provide start of supplyment date'],
        default: new Date().toISOString().slice(0, 10)
    },
    endOfProduction: {
        type: Date
    },
    price: {
        type: Number
    },
    productionProcessItem: {
        materialId: {
            type: mongoose.Types.ObjectId,
            ref: 'productionProcess',
            required: true
        },
        amount: {
            type: Number,
            required: [true, 'Please provide the amount of material used']
        }
    }
})

module.exports = mongoose.model('Material', ProductionProcessSchema)