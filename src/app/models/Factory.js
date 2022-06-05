const mongoose = require('mongoose')
require('./City')
require('./State')

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
				autopopulate: true,
			},
			state: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'State',
				autopopulate: true,
			},
			coordinates: {
				latitude: {
					type: Number,
					required: true,
				},
				longitude: {
					type: Number,
					required: true,
				},
			},
		},
	},
	{ timestamps: true }
)

FactorySchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Factory', FactorySchema)
