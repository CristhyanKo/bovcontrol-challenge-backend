const ServiceBase = require('../services/ServiceBase')
const Model = require('../models/State')

const service = new ServiceBase(Model)

class StateController {
	async getAll(req, res) {
		try {
			const resultService = await service.getAllFull()
			return res.json(resultService)
		} catch (error) {
			return res.status(400).json({
				error: {
					message: error.errors || error.message,
				},
			})
		}
	}
}

module.exports = new StateController()
