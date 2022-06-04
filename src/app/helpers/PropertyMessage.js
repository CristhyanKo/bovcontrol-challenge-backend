module.exports = {
	required: (propertyName) => {
		return `O campo ${propertyName} é obrigatório`
	},
	validate: (propertyName) => {
		return `O campo ${propertyName} não é valido`
	},
}
