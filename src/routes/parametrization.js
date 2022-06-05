const express = require('express')

const routes = express.Router()
const controller = require('../app/controllers').ParametrizationController

routes.post('/store', controller.store)
routes.put('/update', controller.update)
routes.post('/delete', controller.delete)
routes.post('/get', controller.get)
routes.get('/getAll', controller.getAll)

routes.post('/addCostKilometer', controller.addCostKilometer)
routes.post('/removeCostKilometer', controller.removeCostKilometer)
routes.put('/updateCostKilometer', controller.updateCostKilometer)

routes.post('/addBonus', controller.addBonus)
routes.post('/removeBonus', controller.removeBonus)
routes.put('/updateBonus', controller.updateBonus)

module.exports = routes
