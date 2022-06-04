const mongoose = require('mongoose')

const FarmSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		location: {
			city: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'City',
			},
			state: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'State',
			},
			coordinates: {
				latitude: {
					type: String,
					required: true,
				},
				longitude: {
					type: String,
					required: true,
				},
			},
		},
		farmers: [
			{
				farmer: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Farmer',
				},
				startDate: {
					type: Date,
				},
				endDate: {
					type: Date,
				},
				current: {
					type: Boolean,
					default: false,
				},
			},
		],
		cowsHead: {
			type: Number,
			default: 0,
		},
		factories: [
			{
				factory: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Factory',
				},
				factoryDistance: {
					type: Number,
					default: 0,
				},
			},
		],
		supervisors: [
			{
				farmerSupervisor: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Farmer',
				},
				startDate: {
					type: Date,
				},
				endDate: {
					type: Date,
				},
				current: {
					type: Boolean,
					default: false,
				},
			},
		],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Farm', FarmSchema)
