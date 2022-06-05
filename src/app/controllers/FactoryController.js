const yup = require('yup')
const propertyMessage = require('../helpers/PropertyMessage')
const ServiceBase = require('../services/ServiceBase')
const Model = require('../models/Factory')

const service = new ServiceBase(Model)

class FactoryController {
	async store(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				name: yup.string().required(propertyMessage.required('Nome')),
				location: yup.object({
					city: yup.string().required(propertyMessage.required('Cidade')),
					state: yup.string().required(propertyMessage.required('Estado')),
					coordinates: yup.object({
						latitude: yup.number().required(propertyMessage.required('Latitude')),
						longitude: yup.number().required(propertyMessage.required('Longitude')),
					}),
				}),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { name, location } = req.body

			const resultService = await service.store({ name, location }, res)
			return res.json(resultService)
		} catch (error) {
			return res.status(400).json({
				error: {
					message: error.errors || error.message,
				},
			})
		}
	}

	async update(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				factoryId: yup.string().required(propertyMessage.required('Fabrica')).length(24, propertyMessage.validate('Fabrica')),
				name: yup.string(propertyMessage.validate('Nome')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { factoryId, name, location } = req.body

			if (!(await service.checkExist(factoryId))) {
				return res.status(400).json({
					error: {
						message: 'Fabrica não encontrada',
					},
				})
			}

			const resultService = await service.update(factoryId, { name, location })
			return res.json(resultService)
		} catch (error) {
			return res.status(400).json({
				error: {
					message: error.errors || error.message,
				},
			})
		}
	}

	async get(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				factoryId: yup.string().required(propertyMessage.required('Fabrica')).length(24, propertyMessage.validate('Fabrica')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { factoryId } = req.body

			if (!(await service.checkExist(factoryId))) {
				return res.status(400).json({
					error: {
						message: 'Fabrica não encontrada',
					},
				})
			}

			const resultService = await service.get(factoryId, res)
			return res.json(resultService)
		} catch (error) {
			return res.status(400).json({
				error: {
					message: error.errors || error.message,
				},
			})
		}
	}

	async getAll(_, res) {
		try {
			const resultService = await service.getAll(res)
			return res.json(resultService)
		} catch (error) {
			return res.status(400).json({
				error: {
					message: error.errors || error.message,
				},
			})
		}
	}

	async delete(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				factoryId: yup.string().required(propertyMessage.required('Fabrica')).length(24, propertyMessage.validate('Fabrica')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { factoryId } = req.body

			if (!(await service.checkExist(factoryId))) {
				return res.status(400).json({
					error: {
						message: 'Fabrica não encontrada',
					},
				})
			}

			const resultService = await service.delete(factoryId, res)
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

module.exports = new FactoryController()
