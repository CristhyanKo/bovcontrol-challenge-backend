const app = require('express')()

const eps = ['farmer', 'farm', 'factory', 'production', 'parametrization', 'checklist', 'checklistType']

eps.forEach((ep) => {
	try {
		app.use(`/${ep}`, require(`./${ep}`))
	} catch (error) {
		console.log(`Failed load route: ${ep}`)
	}
})

module.exports = app
