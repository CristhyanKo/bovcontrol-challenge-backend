const mongoose = require('mongoose')
require('./City')
require('./State')
require('./Farmer')
require('./Factory')

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
				autopopulate: true,
			},
			state: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'State',
				autopopulate: true,
			},
			coordinates: {
				latitude: {
					type: Number,
					required: true,
				},
				longitude: {
					type: Number,
					required: true,
				},
			},
		},
		farmers: [
			{
				farmer: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Farmer',
					autopopulate: true,
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
					autopopulate: true,
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
					autopopulate: true,
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

FarmSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Farm', FarmSchema)
