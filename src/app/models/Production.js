const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ProductionSchema = new mongoose.Schema(
	{
		farm: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Farm',
			required: true,
			autopopulate: true,
		},
		date: {
			type: Date,
			required: true,
		},
		milkProduced: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{ timestamps: true }
)

ProductionSchema.plugin(require('mongoose-autopopulate'))
ProductionSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Production', ProductionSchema)
