const yup = require('yup')
const propertyMessage = require('../helpers/PropertyMessage')
const FarmService = require('../services/FarmService')
const Model = require('../models/Farm')

const service = new FarmService(Model)

class FarmController {
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
			const { name, location, farmers, cowsHead, factories, supervisors } = req.body

			const resultService = await service.store({ name, location, farmers, cowsHead, factories, supervisors }, res)
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
				_id: yup.string().required(propertyMessage.required('_id')).length(24, propertyMessage.validate('_id')),
				name: yup.string(propertyMessage.validate('Nome')),
				email: yup.string().email(propertyMessage.validate('Email')),
				phone: yup.string().email(propertyMessage.validate('Telefone')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { name, location, farmers, cowsHead, factories, supervisors } = req.body

			const resultService = await service.update({ name, location, farmers, cowsHead, factories, supervisors }, res)
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
				_id: yup.string().required(propertyMessage.required('_id')).length(24, propertyMessage.validate('_id')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { _id } = req.body

			const resultService = await service.get(_id, res)
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
				_id: yup.string().required(propertyMessage.required('_id')).length(24, propertyMessage.validate('_id')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { _id } = req.body

			const resultService = await service.delete(_id, res)
			return res.json(resultService)
		} catch (error) {
			return res.status(400).json({
				error: {
					message: error.errors || error.message,
				},
			})
		}
	}

	async addFarmer(req, res) {
		try {
			return res.json({ message: 'ok' })
			// return await service.addFarmer(_id, res)
			// return res.json(resultService)
		} catch (error) {
			return res.status(400).json({
				error: {
					message: error.errors || error.message,
				},
			})
		}
	}
}

module.exports = new FarmController()
