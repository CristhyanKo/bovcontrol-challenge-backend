const express = require('express')

const routes = express.Router()
const controller = require('../app/controllers').ProductionController

routes.post('/store', controller.store)
routes.post('/update', controller.update)
routes.post('/delete', controller.delete)
routes.post('/get', controller.get)
routes.get('/getAll', controller.getAll)

module.exports = routes
