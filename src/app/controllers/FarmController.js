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
				farmId: yup.string().required(propertyMessage.required('Fazenda')).length(24, propertyMessage.validate('Fazenda')),
				name: yup.string(propertyMessage.validate('Nome')),
				email: yup.string().email(propertyMessage.validate('Email')),
				phone: yup.string().email(propertyMessage.validate('Telefone')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { farmId, name, location, farmers, cowsHead, factories, supervisors } = req.body

			const resultService = await service.update(farmId, { name, location, farmers, cowsHead, factories, supervisors })
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
				farmId: yup.string().required(propertyMessage.required('Fazenda')).length(24, propertyMessage.validate('Fazenda')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { farmId } = req.body

			const resultService = await service.get(farmId, res)
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
				farmId: yup.string().required(propertyMessage.required('Fazenda')).length(24, propertyMessage.validate('Fazenda')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { farmId } = req.body

			const resultService = await service.delete(farmId, res)
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
			const schemaValidation = yup.object().shape({
				farmId: yup.string().required(propertyMessage.required('Fazenda')).length(24, propertyMessage.validate('Fazenda')),
				farmer: yup.string().required(propertyMessage.required('Fazendeiro')).length(24, propertyMessage.validate('Fazendeiro')),
				startDate: yup.date().required(propertyMessage.required('Data de início')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { farmId } = req.body
			const adds = {
				farmer: req.body.farmer,
				startDate: req.body.startDate,
				endDate: req.body.endDate,
				current: req.body.current,
			}
			const resultService = await service.addArray('farmers', farmId, adds)

			return res.json(resultService)
		} catch (error) {
			return res.status(400).json({
				error: {
					message: error.errors || error.message,
				},
			})
		}
	}

	async updateFarmer(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				farmId: yup.string().required(propertyMessage.required('Fazenda')).length(24, propertyMessage.validate('Fazenda')),
				farmer: yup.string().required(propertyMessage.required('Fazendeiro')).length(24, propertyMessage.validate('Fazendeiro')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { farmId } = req.body
			const update = {
				farmer: req.body.farmer,
				startDate: req.body.startDate,
				endDate: req.body.endDate,
				current: req.body.current,
			}
			const resultService = await service.updateArray('farmers', farmId, { farmer: req.body.farmer }, update)

			return res.json(resultService)
		} catch (error) {
			return res.status(400).json({
				error: {
					message: error.errors || error.message,
				},
			})
		}
	}

	async removeFarmer(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				farmId: yup.string().required(propertyMessage.required('Fazenda')).length(24, propertyMessage.validate('Fazenda')),
				farmer: yup.string().required(propertyMessage.required('Fazendeiro')).length(24, propertyMessage.validate('Fazendeiro')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { farmId } = req.body

			const resultService = await service.removeArray('farmers', farmId, { farmer: req.body.farmer })

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

module.exports = new FarmController()
