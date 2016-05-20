"use strict";

module.exports = function (Schema) {
    return {
        name: {type: 'string', require: true},
        templateVote: 'string',
        templateResults: 'string',
        templateTakePart: 'string',
        templateContainer: 'string',
        templateWon: 'string',
        parent: 'string',
        data: Schema.Types.Object,
        last: 'string',
        editable: {
            startDate: {type: 'string', require: true},
            finishDate: {type: 'date', require: true}
        }
    };
};