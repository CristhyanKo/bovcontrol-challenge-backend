/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

const mongoose = require('mongoose')

class ServiceBase {
	constructor(model) {
		this.model = model
	}

	async store(data) {
		const result = await this.model.create(data)

		return {
			result: {
				message: 'Cadastro realizado com sucesso !',
				data: result,
			},
		}
	}

	async update(id, data) {
		const result = await this.model.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, data, { new: true })

		return {
			result: {
				message: 'Cadastro atualizado com sucesso !',
				data: result,
			},
		}
	}

	async get(id) {
		const result = await this.model.findOne({ _id: new mongoose.Types.ObjectId(id) })

		return {
			result: {
				data: result || {},
			},
		}
	}

	async getAll() {
		const result = await this.model.find()

		return {
			result: {
				data: result,
			},
		}
	}

	async delete(id) {
		const result = await this.model.findOneAndDelete({ _id: id })

		return {
			result: {
				message: 'Cadastro deletado com sucesso!',
				data: result,
			},
		}
	}

	async addArray(propertyArray, _id, data) {
		const result = await this.model.findOneAndUpdate({ _id }, { $push: { [propertyArray]: data } }, { new: true })

		return {
			result: {
				message: 'Item adicionado com sucesso !',
				data: result,
			},
		}
	}

	async removeArray(propertyArray, _id, data) {
		await this.model.findOneAndUpdate({ _id }, { $pull: { [propertyArray]: data } }, { new: true })

		return {
			result: {
				message: 'Item removido com sucesso !',
			},
		}
	}

	async updateArray(propertyArray, _id, dataFilter, data) {
		let updateObject = {}

		for (const key in data) {
			updateObject = { ...updateObject, [`${propertyArray}.$.${key}`]: data[key] }
		}

		const result = await this.model.findOneAndUpdate(
			{ _id, [propertyArray]: { $elemMatch: { dataFilter } } },
			{ $set: updateObject },
			{ new: true }
		)

		return {
			result: {
				message: 'Item atualizado com sucesso !',
				data: result,
			},
		}
	}

	async checkExist(id) {
		const result = await this.model.findOne({ _id: new mongoose.Types.ObjectId(id) })
		return !!result
	}
}

module.exports = ServiceBase
