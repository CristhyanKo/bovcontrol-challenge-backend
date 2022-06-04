const app = require('express')()

app.use('/farmer', require('./farmer'))

module.exports = app
