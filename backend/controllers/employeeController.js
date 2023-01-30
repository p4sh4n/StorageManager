const Employee = require('../models/Employee')
const {NotFoundError, BadRequestError, UnauthenticatedError} = require('../errors');
const { StatusCodes } = require('http-status-codes');


const getAllEmployees = async (req,res) => {
    const employees = await Employee.find();
    if(!employees){
       res.status(StatusCodes.NO_CONTENT).json({msg:"Employee collection is empty"})
    }
    res.status(StatusCodes.OK).json({employees})
}

const getEmployee = async (req,res) => {
    const employeeId = req.params.id 
    const targetedEmployee = await Employee.findById({_id:employeeId})
    if(!targetedEmployee){
        throw new NotFoundError('There is no employee with that id')
    }
    res.status(StatusCodes.OK).json({targetedEmployee})
} 

const editEmployee = async (req,res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    if(await Employee.findById(decodedToken.employeeId).user.role != "admin"){
        throw new UnauthenticatedError('You are not an admin!');
    };
    const employeeDataToUpdate = req.body
    const employeeId = req.employee.employeeId
    if(Object.keys(employeeDataToUpdate).length === 0){
        throw new BadRequestError('U need to provide data to update')
    } 
    const updatedEmployee = await Employee.findOneAndUpdate({_id: employeeId}, employeeDataToUpdate, {new:true, runValidators:true} )
    if(!updatedEmployee) {
        throw new NotFoundError('Employee does not exist')
    }
    res.status(StatusCodes.OK).json({updatedEmployee})
}

module.exports = {getAllEmployees, getEmployee, editEmployee}