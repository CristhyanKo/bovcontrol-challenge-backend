const yup = require('yup')
const propertyMessage = require('../helpers/PropertyMessage')
const ServiceBase = require('../services/ServiceBase')
const Model = require('../models/Production')

const service = new ServiceBase(Model)

class ProductionController {
	async store(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				farm: yup.string().required(propertyMessage.required('Fabrica')).length(24, propertyMessage.validate('Fabrica')),
				date: yup.date().required(propertyMessage.required('Data')),
				milkProduced: yup.number().required(propertyMessage.required('Leite Produzido')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { farm, date, milkProduced } = req.body

			const resultService = await service.store({ farm, date, milkProduced }, res)
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
				productionId: yup.string().required(propertyMessage.required('Produção')).length(24, propertyMessage.validate('Produção')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { productionId, farm, date, milkProduced } = req.body

			if (!(await service.checkExist(productionId))) {
				return res.status(400).json({
					error: {
						message: 'Produção não encontrada',
					},
				})
			}

			const resultService = await service.update(productionId, { farm, date, milkProduced })
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
				productionId: yup.string().required(propertyMessage.required('Produção')).length(24, propertyMessage.validate('Produção')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { productionId } = req.body

			if (!(await service.checkExist(productionId))) {
				return res.status(400).json({
					error: {
						message: 'Produção não encontrada',
					},
				})
			}

			const resultService = await service.get(productionId, res)
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
				productionId: yup.string().required(propertyMessage.required('Produção')).length(24, propertyMessage.validate('Produção')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { productionId } = req.body

			if (!(await service.checkExist(productionId))) {
				return res.status(400).json({
					error: {
						message: 'Produção não encontrada',
					},
				})
			}

			const resultService = await service.delete(productionId, res)
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

module.exports = new ProductionController()
