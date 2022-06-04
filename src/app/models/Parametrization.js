const mongoose = require('mongoose')

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

module.exports = mongoose.model('Parametrization', ParametrizationSchema)
