const axios = require('axios')
const mongoose = require('mongoose')

const State = async () => {
	const states = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then((response) => response.data)

	return states.map((state) => ({
		_id: new mongoose.Types.ObjectId(),
		ibge_id: state.id,
		name: state.nome,
		initials: state.sigla,
		createdAt: Date.now(),
	}))
}

module.exports = State
