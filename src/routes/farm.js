const express = require('express')

const routes = express.Router()
const constrollers = require('../app/controllers')

routes.post('/get', constrollers.FarmController.get)
routes.get('/getAll', constrollers.FarmController.getAll)
routes.post('/store', constrollers.FarmController.store)
routes.post('/update', constrollers.FarmController.update)
routes.post('/delete', constrollers.FarmController.delete)

routes.post('/addFarmer', constrollers.FarmController.addFarmer)
routes.post('/removeFarmer', constrollers.FarmController.removeFarmer)
routes.put('/updateFarmer', constrollers.FarmController.updateFarmer)

// routes.post('/addFactory', constrollers.FarmController.addFactory)
// routes.delete('/removeFactory', constrollers.FarmController.removeFactory)
// routes.put('/updateFactory', constrollers.FarmController.updateFactory)

// routes.post('/addSupervisor', constrollers.FarmController.addSupervisor)
// routes.delete('/removeSupervisor', constrollers.FarmController.removeSupervisor)
// routes.put('/updateSupervisor', constrollers.FarmController.updateSupervisor)

module.exports = routes
