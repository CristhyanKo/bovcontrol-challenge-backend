const ServiceBase = require('./ServiceBase')

class FarmService extends ServiceBase {
	constructor(model) {
		super(model)
		this.model = model
	}
}

module.exports = FarmService
