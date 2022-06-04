const ServiceBase = require('./ServiceBase')

class FarmService extends ServiceBase {
	constructor(model) {
		super(model)
		this.model = model
	}

	async addFarmer({ farm, farmer, startDate, endDate, current }, res) {
		if (current) {
			await this.model.updateMany({ _id: farm }, { $set: { 'farmers.current': false } })
		}

		const result = await this.model.updateOne(
			{ _id: farm },
			{
				$push: {
					farmers: {
						farmer,
						startDate,
						endDate,
						current,
					},
				},
			}
		)

		return res.json({
			result: {
				message: 'Fazendeiro cadastrado com sucesso !',
				data: result,
			},
		})
	}
}

module.exports = FarmService
