"use strict";

module.exports = function (Schema, UserSchema) {
	return {
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
		finishDate: 'date',
		last: 'string'
	};
};