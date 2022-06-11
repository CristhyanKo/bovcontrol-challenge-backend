const yup = require('yup')
const propertyMessage = require('../helpers/PropertyMessage')
const ServiceBase = require('../services/ServiceBase')
const Model = require('../models/ChecklistType')

const service = new ServiceBase(Model)

class ChecklistTypeController {
	async store(req, res) {
		try {
			const schemaValidation = yup.object().shape({
				name: yup.string().required(propertyMessage.required('Nome')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { name } = req.body

			const resultService = await service.store({ name }, res)
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
				checklistTypeId: yup
					.string()
					.required(propertyMessage.required('Tipo de Checklist'))
					.length(24, propertyMessage.validate('Tipo de Checklist')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { checklistTypeId, name } = req.body

			if (!(await service.checkExist(checklistTypeId))) {
				return res.status(400).json({
					error: {
						message: 'Tipo de Checklist não encontrado',
					},
				})
			}

			const resultService = await service.update(checklistTypeId, { name })
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
				checklistTypeId: yup
					.string()
					.required(propertyMessage.required('Tipo de Checklist'))
					.length(24, propertyMessage.validate('Tipo de Checklist')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { checklistTypeId } = req.body

			if (!(await service.checkExist(checklistTypeId))) {
				return res.status(400).json({
					error: {
						message: 'Tipo de Checklist não encontrado',
					},
				})
			}

			const resultService = await service.get(checklistTypeId, res)
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

	async getAllFull(req, res) {
		try {
			const resultService = await service.getAllFull()
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
				checklistTypeId: yup
					.string()
					.required(propertyMessage.required('Tipo de Checklist'))
					.length(24, propertyMessage.validate('Tipo de Checklist')),
			})

			await schemaValidation.validate(req.body, { abortEarly: false })
			const { checklistTypeId } = req.body

			if (!(await service.checkExist(checklistTypeId))) {
				return res.status(400).json({
					error: {
						message: 'Tipo de Checklist não encontrado',
					},
				})
			}

			const resultService = await service.delete(checklistTypeId, res)
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

module.exports = new ChecklistTypeController()
