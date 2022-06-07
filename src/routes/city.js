const express = require('express')

const routes = express.Router()
const controller = require('../app/controllers').CityController

routes.get('/getAllFull', controller.getAll)

module.exports = routes
