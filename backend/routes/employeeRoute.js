const express = require('express')
const router = express.Router()
const {getAllEmployees, getEmployee, editEmployee} = require('../controllers/employeeController')

router.route('/').get(getAllEmployees).patch(editEmployee)
router.route('/:id').get(getEmployee)


module.exports = router