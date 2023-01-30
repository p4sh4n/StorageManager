const Material = require('../models/Material')
const {NotFoundError, BadRequestError} = require('../errors');
const { StatusCodes } = require('http-status-codes');


const getAllMaterials = async (req,res) => {
    const materials = await Material.find();
    if(!materials){
       res.status(StatusCodes.NO_CONTENT).json({msg:"Materials collection is empty"})
    }
    res.status(StatusCodes.OK).json({materials})
}

const getMaterial = async (req,res) => {
    const materialId = req.params.id 
    const targetedMaterial = await Material.findById({_id:materialId})
    if(!targetedMaterial){
        throw new NotFoundError('There is no employee with that id')
    }
    res.status(StatusCodes.OK).json({targetedMaterial})
} 

const createMaterial = async (req, res) => {  
    const sentMaterial = req.body
    const material = await Material.create(sentMaterial)
    res.status(StatusCodes.CREATED).json({material})
}

const editMaterial = async (req,res) => {
    const materialrDataToUpdate = req.body
    const materialId = req.material.materialId
    if(Object.keys(materialrDataToUpdate).length === 0){
        throw new BadRequestError('U need to provide data to update')
    } 
    const updatedMaterial = await Material.findOneAndUpdate({_id: materialId}, materialrDataToUpdate, {new:true, runValidators:true} )
    if(!updatedMaterial) {
        throw new NotFoundError('Material does not exist')
    }
    res.status(StatusCodes.OK).json({updatedMaterial})
}

module.exports = {getAllMaterials, getMaterial, editMaterial, createMaterial}