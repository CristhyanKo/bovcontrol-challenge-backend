const mongoose = require('mongoose')

const ChecklistTypeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('ChecklistType', ChecklistTypeSchema)
