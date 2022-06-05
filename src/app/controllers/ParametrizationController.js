const yup = require('yup')
const propertyMessage = require('../helpers/PropertyMessage')
const ServiceBase = require('../services/ServiceBase')
const Model = require('../models/Parametrization')

const service = new ServiceBase(Model)

class ParametrizationController {
	async store(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				period: yup.object({
					startDate: yup.date().required(propertyMessage.required('Data Inicio')),
					endDate: yup.date().required(propertyMessage.required('Data Fim')),
				}),
				basicPriceMilkLiter: yup.number().required(propertyMessage.required('Preço Base do Leite')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { period, basicPriceMilkLiter, costKilometer, bonus } = req.body

			const resultService = await service.store({ period, basicPriceMilkLiter, costKilometer, bonus }, res)
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
				parametrizationId: yup
					.string()
					.required(propertyMessage.required('Parametrização'))
					.length(24, propertyMessage.validate('Parametrização')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { parametrizationId, period, basicPriceMilkLiter, costKilometer, bonus } = req.body

			if (!(await service.checkExist(parametrizationId))) {
				return res.status(400).json({
					error: {
						message: 'Parametrização não encontrada',
					},
				})
			}

			const resultService = await service.update(parametrizationId, { period, basicPriceMilkLiter, costKilometer, bonus })
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
				parametrizationId: yup
					.string()
					.required(propertyMessage.required('Parametrização'))
					.length(24, propertyMessage.validate('Parametrização')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { parametrizationId } = req.body

			if (!(await service.checkExist(parametrizationId))) {
				return res.status(400).json({
					error: {
						message: 'Parametrização não encontrada',
					},
				})
			}

			const resultService = await service.get(parametrizationId, res)
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
				parametrizationId: yup
					.string()
					.required(propertyMessage.required('Parametrização'))
					.length(24, propertyMessage.validate('Parametrização')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { parametrizationId } = req.body

			if (!(await service.checkExist(parametrizationId))) {
				return res.status(400).json({
					error: {
						message: 'Parametrização não encontrada',
					},
				})
			}

			const resultService = await service.delete(parametrizationId, res)
			return res.json(resultService)
		} catch (error) {
			return res.status(400).json({
				error: {
					message: error.errors || error.message,
				},
			})
		}
	}

	async addCostKilometer(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				parametrizationId: yup
					.string()
					.required(propertyMessage.required('Parametrização'))
					.length(24, propertyMessage.validate('Parametrização')),
				max: yup.number().required(propertyMessage.required('KM Máximo')),
				min: yup.number().required(propertyMessage.required('KM Mínimo')),
				price: yup.number().required(propertyMessage.required('Preço')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { parametrizationId } = req.body

			const adds = {
				max: req.body.max,
				min: req.body.min,
				price: req.body.price,
			}

			if (!(await service.checkExist(parametrizationId))) {
				return res.status(400).json({
					error: {
						message: 'Parametrização não encontrada',
					},
				})
			}

			const resultService = await service.addArray('costKilometer', parametrizationId, adds)

			return res.json(resultService)
		} catch (error) {
			return res.status(400).json({
				error: {
					message: error.errors || error.message,
				},
			})
		}
	}

	async updateCostKilometer(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				parametrizationId: yup
					.string()
					.required(propertyMessage.required('Parametrização'))
					.length(24, propertyMessage.validate('Parametrização')),
				costKilometerId: yup
					.string()
					.required(propertyMessage.required('ID Custo por KM'))
					.length(24, propertyMessage.validate('ID Custo por KM')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { parametrizationId } = req.body
			const update = {
				max: req.body.max,
				min: req.body.min,
				price: req.body.price,
			}

			if (!(await service.checkExist(parametrizationId))) {
				return res.status(400).json({
					error: {
						message: 'Parametrização não encontrada',
					},
				})
			}

			const resultService = await service.updateArray('costKilometer', parametrizationId, { _id: req.body.costKilometerId }, update)

			return res.json(resultService)
		} catch (error) {
			return res.status(400).json({
				error: {
					message: error.errors || error.message,
				},
			})
		}
	}

	async removeCostKilometer(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				parametrizationId: yup
					.string()
					.required(propertyMessage.required('Parametrização'))
					.length(24, propertyMessage.validate('Parametrização')),
				costKilometerId: yup
					.string()
					.required(propertyMessage.required('ID Custo por KM'))
					.length(24, propertyMessage.validate('ID Custo por KM')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { parametrizationId } = req.body

			if (!(await service.checkExist(parametrizationId))) {
				return res.status(400).json({
					error: {
						message: 'Parametrização não encontrada',
					},
				})
			}

			const resultService = await service.removeArray('costKilometer', parametrizationId, { _id: req.body.costKilometerId })

			return res.json(resultService)
		} catch (error) {
			return res.status(400).json({
				error: {
					message: error.errors || error.message,
				},
			})
		}
	}

	async addBonus(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				parametrizationId: yup
					.string()
					.required(propertyMessage.required('Parametrização'))
					.length(24, propertyMessage.validate('Parametrização')),
				max: yup.number().required(propertyMessage.required('Litros Máximo')),
				min: yup.number().required(propertyMessage.required('Litros Mínimo')),
				price: yup.number().required(propertyMessage.required('Preço')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { parametrizationId } = req.body
			const adds = {
				max: req.body.max,
				min: req.body.min,
				price: req.body.price,
			}

			if (!(await service.checkExist(parametrizationId))) {
				return res.status(400).json({
					error: {
						message: 'Parametrização não encontrada',
					},
				})
			}

			const resultService = await service.addArray('bonus', parametrizationId, adds)

			return res.json(resultService)
		} catch (error) {
			return res.status(400).json({
				error: {
					message: error.errors || error.message,
				},
			})
		}
	}

	async updateBonus(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				parametrizationId: yup
					.string()
					.required(propertyMessage.required('Parametrização'))
					.length(24, propertyMessage.validate('Parametrização')),
				bonusId: yup.string().required(propertyMessage.required('ID Bonus')).length(24, propertyMessage.validate('ID Bonus')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { parametrizationId } = req.body
			const update = {
				max: req.body.max,
				min: req.body.min,
				price: req.body.price,
			}

			if (!(await service.checkExist(parametrizationId))) {
				return res.status(400).json({
					error: {
						message: 'Parametrização não encontrada',
					},
				})
			}

			const resultService = await service.updateArray('bonus', parametrizationId, { _id: req.body.bonusId }, update)

			return res.json(resultService)
		} catch (error) {
			return res.status(400).json({
				error: {
					message: error.errors || error.message,
				},
			})
		}
	}

	async removeBonus(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				parametrizationId: yup
					.string()
					.required(propertyMessage.required('Parametrização'))
					.length(24, propertyMessage.validate('Parametrização')),
				bonusId: yup.string().required(propertyMessage.required('ID Bonus')).length(24, propertyMessage.validate('ID Bonus')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { parametrizationId } = req.body

			if (!(await service.checkExist(parametrizationId))) {
				return res.status(400).json({
					error: {
						message: 'Parametrização não encontrada',
					},
				})
			}

			const resultService = await service.removeArray('bonus', parametrizationId, { _id: req.body.bonusId })

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

module.exports = new ParametrizationController()
