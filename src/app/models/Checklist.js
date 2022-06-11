const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ChecklistSchema = new mongoose.Schema(
	{
		farm: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Farm',
			required: true,
			autopopulate: true,
		},
		checklistType: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ChecklistType',
			required: true,
			autopopulate: true,
		},
	},
	{ timestamps: true }
)

ChecklistSchema.plugin(mongoosePaginate)
ChecklistSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Checklist', ChecklistSchema)
