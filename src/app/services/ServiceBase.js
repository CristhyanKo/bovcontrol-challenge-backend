const mongoose = require('mongoose')

class ServiceBase {
	constructor(model) {
		this.model = model
	}

	async store(data, res) {
		const result = await this.model.create(data)

		return res.json({
			result: {
				message: 'Cadastro realizado com sucesso !',
				data: result,
			},
		})
	}

	async update(data, res) {
		const { _id } = data
		const result = await this.model.findOneAndUpdate({ _id }, data, { new: true })

		return res.json({
			result: {
				message: 'Cadastro realizado com sucesso !',
				data: result,
			},
		})
	}

	async get(id, res) {
		const result = await this.model.findOne({ _id: new mongoose.Types.ObjectId(id) })

		return res.json({
			result: {
				data: result || {},
			},
		})
	}

	async getAll(res) {
		const result = await this.model.find()

		return res.json({
			result: {
				data: result,
			},
		})
	}

	async delete(id, res) {
		const result = await this.model.findOneAndDelete({ _id: id })

		return res.json({
			result: {
				message: 'Item deletado com sucesso!',
				data: result,
			},
		})
	}
}

module.exports = ServiceBase
