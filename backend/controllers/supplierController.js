const Supplier = require('../models/Supplier')
const {NotFoundError, BadRequestError} = require('../errors');
const { StatusCodes } = require('http-status-codes');


const getAllSuppliers = async (req,res) => {
    const suppliers = await Supplier.find();
    if(!suppliers){
       res.status(StatusCodes.NO_CONTENT).json({msg:"Suppliers collection is empty"})
    }
    res.status(StatusCodes.OK).json({suppliers})
}

const getSupplier = async (req,res) => {
    const supplierId = req.params.id 
    const targetedSupplier = await Supplier.findById({_id:supplierId})
    if(!targetedSupplier){
        throw new NotFoundError('There is no employee with that id')
    }
    res.status(StatusCodes.OK).json({targetedSupplier})
} 

const createSupplier = async (req, res) => {  
    try{
        const sentSupplier = req.body
        const supplier = await Supplier.create(sentSupplier)
        res.status(StatusCodes.CREATED).json({supplier})
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

const editSupplier = async (req,res) => {
    const supplierDataToUpdate = req.body
    if(Object.keys(supplierDataToUpdate).length === 0){
        throw new BadRequestError('U need to provide data to update')
    } 
    const updatedSupplier = await Supplier.findOneAndUpdate({_id: req.body.supplierId}, supplierDataToUpdate, {new:true, runValidators:true} )
    if(!updatedSupplier) {
        throw new NotFoundError('Supplier does not exist')
    }
    res.status(StatusCodes.OK).json({updatedSupplier})
}

module.exports = {getAllSuppliers, getSupplier, editSupplier, createSupplier}