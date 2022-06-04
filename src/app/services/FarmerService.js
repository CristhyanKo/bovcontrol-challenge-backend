const mongoose = require('mongoose')
const Farmer = require('../models/Farmer')

class FarmerService {
	async store(data, res) {
		const result = await Farmer.create(data)

		return res.json({
			result: {
				message: 'Cadastro realizado com sucesso !',
				data: result,
			},
		})
	}

	async get(id, res) {
		const result = await Farmer.findOne({ _id: new mongoose.Types.ObjectId(id) })

		return res.json({
			result: {
				data: result || {},
			},
		})
	}

	async getAll(res) {
		const result = await Farmer.find()

		return res.json({
			result: {
				data: result,
			},
		})
	}

	async delete(id, res) {
		const result = await Farmer.findOneAndDelete({ _id: id })

		return res.json({
			result: {
				message: 'Item deletado com sucesso!',
				data: result,
			},
		})
	}
}

module.exports = new FarmerService()
