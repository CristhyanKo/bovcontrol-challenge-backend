const express = require('express')

const routes = express.Router()
const controller = require('../app/controllers').StateController

routes.get('/getAllFull', controller.getAll)

module.exports = routes
