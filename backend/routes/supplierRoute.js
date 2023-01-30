const express = require('express')
const router = express.Router()
const {getAllSuppliers, getSupplier, editSupplier, createSupplier} = require('../controllers/supplierController')

router.route('/').get(getAllSuppliers).patch(editSupplier).post(createSupplier)
router.route('/:id').get(getSupplier)


module.exports = router