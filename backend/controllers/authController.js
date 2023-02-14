const Employee = require("../models/Employee")
const {NotFoundError, BadRequestError, UnauthenticatedError} = require('../errors');
const { StatusCodes } = require('http-status-codes')

const registerEmployee = async (req, res) => {  
    try {
        const sentEmployee = req.body
        const employee = await Employee.create(sentEmployee)
        const { ...returnObject } = employee._doc
        delete returnObject.passwordHash
        const token = employee.createJWT();
        res.status(StatusCodes.CREATED).json({ employee: returnObject, token })
    } catch (error) {
        if (error.name === "ValidationError") {
            const message = Object.values(error.errors).map(value => value.message);
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: message
            })
        }
        res.status(StatusCodes.BAD_REQUEST).send("Something went wrong");
    }
    
}

const loginEmployee = async (req, res) => {
    const {username, password} = req.body
    if(!username || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: "Please provide username and password"
        })
    }
    const employee = await Employee.findOne({'user.username': username})
    if(!employee || employee.endOfEmployment != null || employee.endOfEmployment != undefined){
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: "User does not exist"
        })
    }
    const comparedPassword = await employee.comparePassword(password)
    if(!comparedPassword){
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: "Password is not correct"
        })
    }
    const token = employee.createJWT();
    const { ...returnObject } = employee._doc
    delete returnObject.passwordHash
    res.status(StatusCodes.OK).json({returnObject, token})
}

module.exports = { registerEmployee, loginEmployee }