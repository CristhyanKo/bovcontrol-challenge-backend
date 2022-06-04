const express = require('express')

const routes = express.Router()
const constrollers = require('../app/controllers')

routes.post('/store', constrollers.FarmController.store)
routes.post('/get', constrollers.FarmController.get)
routes.get('/getAll', constrollers.FarmController.getAll)
routes.delete('/delete', constrollers.FarmController.delete)

// routes.post('/addFarmer', constrollers.FarmController.addFarmer)
// routes.delete('/removeFarmer', constrollers.FarmController.removeFarmer)
// routes.put('/updateFarmer', constrollers.FarmController.updateFarmer)

module.exports = routes
