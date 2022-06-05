const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

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

FarmerSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Farmer', FarmerSchema)
