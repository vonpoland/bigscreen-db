"use strict";

module.exports = function (Schema) {
    return {
        name: {type: 'string', require: true},
        templateVote: 'string',
        templateContainer: 'string',
        parent: 'string',
        data: Schema.Types.Object,
        last: 'string',
        votes: [{
            option: 'object',
            user: {type: 'objectId', ref: 'User'},
            date: 'date',
            pollName: 'string'
        }],
        editable: {
            startDate: {type: 'string', require: true},
            finishDate: {type: 'date', require: true}
        }
    };
};