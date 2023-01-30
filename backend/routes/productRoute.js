const express = require('express')
const router = express.Router()
const {getAllProducts, getProduct, editProduct, createProduct} = require('../controllers/productController')

router.route('/').get(getAllProducts).patch(editProduct).post(createProduct)
router.route('/:id').get(getProduct)


module.exports = router