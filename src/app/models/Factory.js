const mongoose = require('mongoose')

const FactorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		location: {
			city: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'City',
			},
			state: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'State',
			},
			coordinates: {
				latitude: {
					type: String,
					required: true,
				},
				longitude: {
					type: String,
					required: true,
				},
			},
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Factory', FactorySchema)
