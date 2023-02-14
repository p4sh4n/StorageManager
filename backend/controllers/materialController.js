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
    try{
        const sentMaterial = req.body
        const material = await Material.create(sentMaterial)
        res.status(StatusCodes.CREATED).json({material})
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

const editMaterial = async (req,res) => {
    const materialrDataToUpdate = req.body
    if(Object.keys(materialrDataToUpdate).length === 0){
        throw new BadRequestError('U need to provide data to update')
    } 
    const updatedMaterial = await Material.findOneAndUpdate({_id: req.body.materialId}, materialrDataToUpdate, {new:true, runValidators:true} )
    if(!updatedMaterial) {
        throw new NotFoundError('Material does not exist')
    }
    res.status(StatusCodes.OK).json({updatedMaterial})
}

module.exports = {getAllMaterials, getMaterial, editMaterial, createMaterial}