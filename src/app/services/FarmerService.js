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
}

module.exports = new FarmerService()
