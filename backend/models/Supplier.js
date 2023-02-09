const mongoose = require('mongoose')


const SupplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name of the supplier'],
        minLength: 1,
        maxLength: 30
    },
    JIB: {
        type: Number,
        required: [true, 'Please provide JIB']
    },
    PDV: {
        type: Number,
        required: [true, 'Please provide PDV']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide phone number of the supplier']
    },
    contactPersonName: {
        type: String,
        required: [true, 'Please provide contact person of the supplier']
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email'
        ],
        unique: true
    },
    startOfSupplyment: {
        type: Date,
        required: [true, 'Please provide start of supplyment date'],
        default: new Date().toISOString().slice(0, 10)
    },
    endOfSupplyment: {
        type: Date
    }
})

module.exports = mongoose.model('Supplier', SupplierSchema)