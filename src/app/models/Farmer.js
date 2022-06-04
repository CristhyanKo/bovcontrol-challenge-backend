const mongoose = require('mongoose')

const FarmerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
		},
		isSupervisor: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Farmer', FarmerSchema)
