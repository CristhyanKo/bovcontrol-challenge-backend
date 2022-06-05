const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ChecklistSchema = new mongoose.Schema(
	{
		farm: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Farm',
			required: true,
		},
		checklistType: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ChecklistType',
			required: true,
		},
	},
	{ timestamps: true }
)

ChecklistSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Checklist', ChecklistSchema)
