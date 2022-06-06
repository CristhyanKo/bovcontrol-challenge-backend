const yup = require('yup')
const propertyMessage = require('../helpers/PropertyMessage')
const ServiceBase = require('../services/ServiceBase')
const Model = require('../models/Factory')

const service = new ServiceBase(Model)

class CityController {
	async get(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				state: yup.string().required(propertyMessage.required('Estado')).length(24, propertyMessage.validate('Estado')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { state } = req.body

			if (!(await service.checkExist(state))) {
				return res.status(400).json({
					error: {
						message: 'Fabrica não encontrada',
					},
				})
			}

			const resultService = await service.get({ state }, res)
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

module.exports = new CityController()
