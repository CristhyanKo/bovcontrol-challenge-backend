const mongoose = require('mongoose')
require('./State')

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
			autopopulate: true,
		},
	},
	{ timestamps: true }
)

CitySchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('City', CitySchema)
