const yup = require('yup')
const propertyMessage = require('../helpers/PropertyMessage')
const service = require('../services/FarmerService')

class Farmer {
	async store(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				name: yup.string().required(propertyMessage.required('Nome')),
				email: yup.string().email(propertyMessage.validate('Email')).required(propertyMessage.required('Email')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { name, email, phone, isSupervisor } = req.body

			return await service.store({ name, email, phone, isSupervisor }, res)
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

			return await service.get(_id, res)
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
			return await service.getAll(res)
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

			return await service.delete(_id, res)
		} catch (error) {
			return res.status(400).json({
				error: {
					message: error.errors || error.message,
				},
			})
		}
	}
}

module.exports = new Farmer()
