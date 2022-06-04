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
}

module.exports = new Farmer()
