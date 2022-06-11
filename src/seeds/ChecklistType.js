const mongoose = require('mongoose')

const State = async () => {
	const data = ['BPA', 'Antibiótico', 'BPF']

	return data.map((type) => ({
		_id: new mongoose.Types.ObjectId(),
		name: type,
	}))
}

module.exports = State
