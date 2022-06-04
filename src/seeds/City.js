const axios = require('axios')
const mongoose = require('mongoose')

const City = async (states) => {
	const promises = states.map(async (state) => {
		const data = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.ibge_id}/municipios`).then((response) => {
			return response.data.map((city) => {
				return {
					_id: new mongoose.Types.ObjectId(),
					ibge_id: city.id,
					name: city.nome,
					state: new mongoose.Types.ObjectId(state._id),
					createdAt: Date.now(),
				}
			})
		})

		return data
	})

	return Promise.all(promises)
}

module.exports = City
