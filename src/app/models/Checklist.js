const mongoose = require('mongoose')

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

module.exports = mongoose.model('Checklist', ChecklistSchema)
