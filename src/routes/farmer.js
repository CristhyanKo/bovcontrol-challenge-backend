const express = require('express')

const routes = express.Router()
const constrollers = require('../app/controllers')

routes.post('/get', constrollers.FarmerController.get)
routes.get('/getAll', constrollers.FarmerController.getAll)
routes.post('/store', constrollers.FarmerController.store)
routes.post('/update', constrollers.FarmerController.update)
routes.delete('/delete', constrollers.FarmerController.delete)

module.exports = routes
