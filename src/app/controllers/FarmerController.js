const yup = require('yup')
const propertyMessage = require('../helpers/PropertyMessage')
const ServiceBase = require('../services/ServiceBase')
const Model = require('../models/Farmer')

const service = new ServiceBase(Model)
class FarmerController {
	async store(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				name: yup.string().required(propertyMessage.required('Nome')),
				email: yup.string().email(propertyMessage.validate('Email')).required(propertyMessage.required('Email')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { name, email, phone, isSupervisor } = req.body

			const resultService = await service.store({ name, email, phone, isSupervisor })
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
			const { name, email, phone, isSupervisor } = req.body

			const resultService = await service.update({ name, email, phone, isSupervisor }, res)
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
}

module.exports = new FarmerController()
