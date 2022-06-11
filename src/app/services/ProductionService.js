const ServiceBase = require('./ServiceBase')

class ProductionService extends ServiceBase {
	constructor(model) {
		super(model)
		this.model = model
	}

	async getByFarm(filter) {
		const result = await this.model.find({ farm: filter })

		return {
			result: {
				data: result || {},
			},
		}
	}
}

module.exports = ProductionService
