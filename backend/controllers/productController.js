const Product = require('../models/Product')
const {NotFoundError, BadRequestError} = require('../errors');
const { StatusCodes } = require('http-status-codes');
const ProductionProcess = require('../models/ProductionProcess');


const getAllProducts = async (req,res) => {
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
    const sentProductionProcess = ProductionProcess.findById(sentProduct.productionProcessId);
    sentProduct.price = sentProduct.profitMargin * sentProductionProcess.price;
    const product = await Product.create(sentProduct)
    res.status(StatusCodes.CREATED).json({product})
}

const editProduct = async (req,res) => {
    const productDataToUpdate = req.body
    const productId = req.product.productId
    if(Object.keys(productDataToUpdate).length === 0){
        throw new BadRequestError('U need to provide data to update')
    } 
    const updatedProduct = await Product.findOneAndUpdate({_id: productId}, productDataToUpdate, {new:true, runValidators:true} )
    if(!updatedProduct) {
        throw new NotFoundError('Product does not exist')
    }
    res.status(StatusCodes.OK).json({updatedProduct})
}

module.exports = {getAllProducts, getProduct, editProduct, createProduct}