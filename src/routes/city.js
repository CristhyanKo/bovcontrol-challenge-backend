const express = require('express')

const routes = express.Router()
const controller = require('../app/controllers').CityController

routes.get('/get', controller.get)

module.exports = routes
