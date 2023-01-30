const Employee = require("../models/Employee")
const { StatusCodes } = require('http-status-codes')

const registerEmployee = async (req, res) => {  
    const sentEmployee = req.body
    const employee = await Employee.create(sentEmployee)
    const { ...returnObject } = employee._doc
    delete returnObject.passwordHash
    const token = employee.createJWT();
    res.status(StatusCodes.CREATED).json({ employee: returnObject, token })
}

const loginEmployee = async (req, res) => {
    const {username, password} = req.body
    if(!username || !password){
        throw new BadRequestError('Please provide username and password')
    }
    const employee = await Employee.findOne({username: username})
    if(!employee){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const comparedPassword = await employee.comparePassword(password)
    if(!comparedPassword){
        throw new UnauthenticatedError('Invalid password')
    }
    const token = employee.createJWT();
    const { ...returnObject } = employee._doc
    delete returnObject.passwordHash
    res.status(StatusCodes.OK).json({returnObject, token})
}

module.exports = { registerEmployee, loginEmployee }