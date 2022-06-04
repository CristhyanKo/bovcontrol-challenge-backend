const express = require('express')

const routes = express.Router()
const constrollers = require('../app/controllers')

routes.post('/store', constrollers.Farmer.store)
routes.post('/get', constrollers.Farmer.get)
routes.get('/getAll', constrollers.Farmer.getAll)
routes.delete('/delete', constrollers.Farmer.delete)

module.exports = routes
