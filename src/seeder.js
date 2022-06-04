/* eslint-disable no-console */
const mongoose = require('mongoose')
const State = require('./app/models/State')
const City = require('./app/models/City')
const seed = require('./seeds')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})

const seedDB = async () => {
	console.log('Seeding database...')
	console.log('-----------------------------')
	await State.deleteMany({}).then(() => console.log('> States deleted'))
	await State.insertMany(await seed.State()).then(() => console.log('> States seeded'))

	await City.deleteMany({}).then(() => console.log('> Cities deleted'))

	const citiesState = await seed.City(await State.find())
	const promises = citiesState.map(async (city) => {
		await City.insertMany(city)
	})

	await Promise.all(promises).then(() => console.log('> Cities seeded'))
}

seedDB().then(() => {
	console.log('-----------------------------')
	console.log('>>> Database seeded')
	mongoose.connection.close()
})
