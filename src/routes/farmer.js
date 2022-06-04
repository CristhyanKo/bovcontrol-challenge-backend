const express = require('express')

const routes = express.Router()
const constrollers = require('../app/controllers')

routes.post('/store', constrollers.Farmer.store)

module.exports = routes
