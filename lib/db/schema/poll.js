module.exports = function (Schema, UserSchema) {
	return {
		finished: 'boolean',
		options: ['string'],
		name: {type: 'string', require: true},
		templateVote: 'string',
		templateResults: 'string',
		templateTakePart: 'string',
		templateWon: 'string',
		parent: 'string',
		data: Schema.Types.Object,
		winner: UserSchema
	};
};