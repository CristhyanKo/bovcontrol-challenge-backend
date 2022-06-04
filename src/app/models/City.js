const mongoose = require('mongoose')

const CitySchema = new mongoose.Schema(
	{
		ibge_id: {
			type: Number,
			required: true,
			unique: true,
		},

		name: {
			type: String,
			required: true,
		},

		state: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'State',
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('City', CitySchema)
