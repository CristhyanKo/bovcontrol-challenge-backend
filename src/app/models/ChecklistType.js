const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ChecklistTypeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

ChecklistTypeSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('ChecklistType', ChecklistTypeSchema)
