const express = require('express')
const router = express.Router()
const {getAllMaterials, getMaterial, editMaterial, createMaterial} = require('../controllers/materialController')

router.route('/').get(getAllMaterials).patch(editMaterial).post(createMaterial)
router.route('/:id').get(getMaterial)


module.exports = router