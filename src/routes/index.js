const app = require('express')()

app.use('/', require('./welcome'))

module.exports = app