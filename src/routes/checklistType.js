const express = require('express')

const routes = express.Router()
const controller = require('../app/controllers').ChecklistTypeController

routes.post('/store', controller.store)
routes.post('/update', controller.update)
routes.post('/delete', controller.delete)
routes.post('/get', controller.get)
routes.get('/getAll', controller.getAll)
routes.get('/getAllFull', controller.getAllFull)

module.exports = routes
