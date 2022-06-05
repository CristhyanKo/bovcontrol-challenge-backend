const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ParametrizationSchema = new mongoose.Schema(
	{
		period: {
			startDate: {
				type: Date,
				required: true,
			},
			endDate: {
				type: Date,
				required: true,
			},
		},
		basicPriceMilkLiter: {
			type: Number,
			required: true,
		},
		costKilometer: [
			{
				max: {
					type: Number,
					default: 0,
				},
				min: {
					type: Number,
					default: 0,
				},
				price: {
					type: Number,
					default: 0,
				},
			},
		],
		bonus: [
			{
				max: {
					type: Number,
					default: 0,
				},
				min: {
					type: Number,
					default: 0,
				},
				price: {
					type: Number,
					default: 0,
				},
			},
		],
	},
	{ timestamps: true }
)

ParametrizationSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Parametrization', ParametrizationSchema)
