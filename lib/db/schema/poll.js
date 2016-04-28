"use strict";

module.exports = function (Schema, UserSchema) {
	return {
		finished: 'boolean',
		name: {type: 'string', require: true},
		templateVote: 'string',
		templateResults: 'string',
		templateTakePart: 'string',
		templateContainer: 'string',
		templateWon: 'string',
		parent: 'string',
		data: Schema.Types.Object,
		winner: UserSchema,
		startDate: 'date',
		last: 'string'
	};
};