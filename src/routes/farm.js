const express = require('express')

const routes = express.Router()
const controller = require('../app/controllers').FarmController

routes.post('/store', controller.store)
routes.post('/update', controller.update)
routes.post('/delete', controller.delete)
routes.post('/get', controller.get)
routes.get('/getAll', controller.getAll)

routes.post('/addFarmer', controller.addFarmer)
routes.post('/removeFarmer', controller.removeFarmer)
routes.post('/updateFarmer', controller.updateFarmer)

routes.post('/addFactory', controller.addFactory)
routes.post('/removeFactory', controller.removeFactory)
routes.post('/updateFactory', controller.updateFactory)

routes.post('/addSupervisor', controller.addSupervisor)
routes.post('/removeSupervisor', controller.removeSupervisor)
routes.post('/updateSupervisor', controller.updateSupervisor)

module.exports = routes
