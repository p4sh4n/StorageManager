const ProductionProcess = require('../models/ProductionProcess')
const Material = require('../models/Material')
const {NotFoundError, BadRequestError} = require('../errors');
const { StatusCodes } = require('http-status-codes');


const getAllProductionProcesses = async (req,res) => {
    const productionProcesses = await ProductionProcess.find();
    if(!products){
       res.status(StatusCodes.NO_CONTENT).json({msg:"ProductionProcesses collection is empty"})
    }
    res.status(StatusCodes.OK).json({productionProcesses})
}

const getProductionProcess = async (req,res) => {
    const productionProcessId = req.params.id 
    const targetedProductionProcess = await ProductionProcess.findById({_id:productionProcessId})
    if(!targetedProductionProcess){
        throw new NotFoundError('There is no employee with that id')
    }
    res.status(StatusCodes.OK).json({targetedProductionProcess})
} 

const createProductionProcess = async (req, res) => {  
    const sentProductionProcess = req.body;
    const sentMaterial = Material.findById(sentProductionProcess.productionProcessItem.materialId);
    sentProductionProcess.price = sentMaterial.price * sentProductionProcess.productionProcessItem.amount;
    const productionProcess = await ProductionProcess.create(sentProductionProcess);
    res.status(StatusCodes.CREATED).json({productionProcess})
}

const editProductionProcess = async (req,res) => {
    const productionProcessDataToUpdate = req.body
    const productionProcessId = req.productionProcess.productionProcessId
    if(Object.keys(productionProcessDataToUpdate).length === 0){
        throw new BadRequestError('U need to provide data to update')
    } 
    const updatedProductionProcess = await Product.findOneAndUpdate({_id: productionProcessId}, productionProcessDataToUpdate, {new:true, runValidators:true} )
    if(!updatedProductionProcess) {
        throw new NotFoundError('Product does not exist')
    }
    res.status(StatusCodes.OK).json({updatedProductionProcess})
}

module.exports = {getAllProductionProcesses, getProductionProcess, editProductionProcess, createProductionProcess}