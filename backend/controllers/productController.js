const Product = require('../models/Product')
const {NotFoundError, BadRequestError} = require('../errors');
const { StatusCodes } = require('http-status-codes');
const ProductionProcess = require('../models/ProductionProcess');
const Material = require('../models/Material')


const getAllProducts = async (req,res) => {
    console.log(req.headers);
    const products = await Product.find();
    if(!products){
       res.status(StatusCodes.NO_CONTENT).json({msg:"Products collection is empty"})
    }
    res.status(StatusCodes.OK).json({products})
}

const getProduct = async (req,res) => {
    const productId = req.params.id 
    const targetedProduct = await Product.findById({_id:productId})
    if(!targetedProduct){
        throw new NotFoundError('There is no employee with that id')
    }
    res.status(StatusCodes.OK).json({targetedProduct})
} 

const createProduct = async (req, res) => {  
    const sentProduct = req.body
    const sentProductionProcess = await ProductionProcess.findById(sentProduct.productionProcessId);
    const sentMaterial = await Material.findById(sentProductionProcess.productionProcessItem.materialId);
    sentProduct.price = sentProduct.profitMargin * sentProductionProcess.price;
    sentMaterial.amount -= sentProductionProcess.productionProcessItem.amount;
    if(sentMaterial.amount < sentMaterial.minimumAmount){
        res.status(StatusCodes.BAD_REQUEST).json({msg: "Material amount too low, contact supplier and add materials before production."})
    }
    await Material.findOneAndUpdate({_id: sentProductionProcess.productionProcessItem.materialId}, sentMaterial, {new:true, runValidators:true})
    const product = await Product.create(sentProduct)
    res.status(StatusCodes.CREATED).json({product})
}

const editProduct = async (req,res) => {
    const productDataToUpdate = req.body
    if(Object.keys(productDataToUpdate).length === 0){
        throw new BadRequestError('U need to provide data to update')
    } 
    const updatedProduct = await Product.findOneAndUpdate({_id: productDataToUpdate.productId}, productDataToUpdate, {new:true, runValidators:true} )
    if(!updatedProduct) {
        throw new NotFoundError('Product does not exist')
    }
    res.status(StatusCodes.OK).json({updatedProduct})
}

module.exports = {getAllProducts, getProduct, editProduct, createProduct}