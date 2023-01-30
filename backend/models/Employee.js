const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const EmployeeSchema = new mongoose.Schema({
    user: {
        username: {
            type: String,
            required: [true, 'Please provide username'],
            minLength: 4,
            maxLength: 30,
            unique: true
        },
        passwordHash: {
            type: String,
            required: [true, 'Please provide password'],
            minLength: 6
        },
        role: {
            type: String,
            enum: {
                values: ['employee', 'admin'],
                message: '{VALUE} type does not exist!'
            }
        },
    },
    firstName: {
        type: String,
        required: [true, 'Please provide first name'],
        minLength: 1,
        maxLength: 30
    },
    lastName: {
        type: String,
        required: [true, 'Please provide last name'],
        minLength: 1,
        maxLength: 30
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide phone number'],
        maxLength: 20,
        unique: true
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
    homeAdress: {
        type: String,
        required: [true, 'Please provide home adress.'],
        maxLength: 20,
        unique: true
    },
    startOfEmployment: {
        type: Date,
        required: [true, 'Please provide start of employment date'],
        default: new Date().toISOString().slice(0, 10)
    },
    endOfEmployment: {
        type: Date
    }
})

EmployeeSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt)
    next()
})

EmployeeSchema.methods.createJWT = function () {
    return jwt.sign({ employeeId: this._id, name: this.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}
EmployeeSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.passwordHash)
    return isMatch
}

module.exports = mongoose.model('Employee', EmployeeSchema)