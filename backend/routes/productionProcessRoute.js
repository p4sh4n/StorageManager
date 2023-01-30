const express = require('express')
const router = express.Router()
const {getAllProductionProcesses, getProductionProcess, editProductionProcess, createProductionProcess} = require('../controllers/productionProcessController')

router.route('/').get(getAllProductionProcesses).patch(editProductionProcess).post(createProductionProcess)
router.route('/:id').get(getProductionProcess)


module.exports = router