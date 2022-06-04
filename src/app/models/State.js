const mongoose = require('mongoose')

const StateSchema = new mongoose.Schema(
	{
		ibge_id: {
			type: Number,
			required: true,
			unique: true,
		},

		name: {
			type: String,
			required: true,
			unique: true,
		},

		initials: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('State', StateSchema)
