const yup = require('yup')
const propertyMessage = require('../helpers/PropertyMessage')
const ServiceBase = require('../services/ServiceBase')
const Model = require('../models/Checklist')

const service = new ServiceBase(Model)

class ChecklistController {
	async store(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				farm: yup.string().required(propertyMessage.required('Fazenda')).length(24, propertyMessage.validate('Fazenda')),
				farmer: yup.string().required(propertyMessage.required('Fazendeiro')).length(24, propertyMessage.validate('Fazendeiro')),
				checklistType: yup
					.string()
					.required(propertyMessage.required('Tipo de Checklist'))
					.length(24, propertyMessage.validate('Tipo de Checklist')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { farm, farmer, checklistType } = req.body

			const resultService = await service.store({ farm, farmer, checklistType }, res)
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
				checklistId: yup.string().required(propertyMessage.required('Checklist')).length(24, propertyMessage.validate('Checklist')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { checklistId, farm, farmer, checklistType } = req.body

			if (!(await service.checkExist(checklistId))) {
				return res.status(400).json({
					error: {
						message: 'Checklist não encontrado',
					},
				})
			}

			const resultService = await service.update(checklistId, { farm, farmer, checklistType })
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
				checklistId: yup.string().required(propertyMessage.required('Checklist')).length(24, propertyMessage.validate('Checklist')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { checklistId } = req.body

			if (!(await service.checkExist(checklistId))) {
				return res.status(400).json({
					error: {
						message: 'Checklist não encontrado',
					},
				})
			}

			const resultService = await service.get(checklistId, res)
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
				checklistId: yup.string().required(propertyMessage.required('Checklist')).length(24, propertyMessage.validate('Checklist')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { checklistId } = req.body

			if (!(await service.checkExist(checklistId))) {
				return res.status(400).json({
					error: {
						message: 'Checklist não encontrado',
					},
				})
			}

			const resultService = await service.delete(checklistId, res)
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

module.exports = new ChecklistController()
