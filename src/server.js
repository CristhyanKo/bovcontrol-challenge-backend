const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

class App {
	constructor() {
		this.express = express()

		require('dotenv').config()

		// DB
		this.middlewares()
		this.routes()
	}

	middlewares() {
		this.express.use(express.json())
		this.express.use(bodyParser.json())
		this.express.use(bodyParser.urlencoded({ extended: false }))
		this.express.use(cors())
		this.express.options('*', cors())
	}

	routes() {
		this.express.use('/v1', require('./routes'))
	}
}

module.exports = new App().express
