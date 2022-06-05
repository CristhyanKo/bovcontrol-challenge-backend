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
				farmerId: yup.string().required(propertyMessage.required('Fazendeiro')).length(24, propertyMessage.validate('Fazendeiro')),
				name: yup.string(propertyMessage.validate('Nome')),
				email: yup.string().email(propertyMessage.validate('Email')),
				phone: yup.string().email(propertyMessage.validate('Telefone')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { farmerId, name, email, phone, isSupervisor } = req.body

			if (!(await service.checkExist(farmerId))) {
				return res.status(400).json({
					error: {
						message: 'Fazendeiro não encontrado',
					},
				})
			}

			const resultService = await service.update(farmerId, { name, email, phone, isSupervisor })
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
				farmerId: yup.string().required(propertyMessage.required('Fazendeiro')).length(24, propertyMessage.validate('Fazendeiro')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { farmerId } = req.body

			if (!(await service.checkExist(farmerId))) {
				return res.status(400).json({
					error: {
						message: 'Fazendeiro não encontrado',
					},
				})
			}

			const resultService = await service.get(farmerId, res)
			return res.json(resultService)
		} catch (error) {
			return res.status(400).json({
				error: {
					message: error.errors || error.message,
				},
			})
		}
	}

	async getAll(req, res) {
		try {
			const resultService = await service.getAll(req.query.page, req.query.limit)
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
				farmerId: yup.string().required(propertyMessage.required('Fazendeiro')).length(24, propertyMessage.validate('Fazendeiro')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { farmerId } = req.body

			if (!(await service.checkExist(farmerId))) {
				return res.status(400).json({
					error: {
						message: 'Fazendeiro não encontrado',
					},
				})
			}

			const resultService = await service.delete(farmerId, res)
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
