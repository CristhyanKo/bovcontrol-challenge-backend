const app = require('express')()

app.use('/farmer', require('./farmer'))
app.use('/farm', require('./farm'))

module.exports = app
