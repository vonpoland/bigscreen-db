"use strict";

module.exports = function (Schema) {
    return {
        name: {type: 'string', require: true},
        templateVote: 'string',
        templateContainer: 'string',
        parent: 'string',
        data: Schema.Types.Object,
        last: 'string',
        editable: {
            startDate: {type: 'date', require: true},
            finishDate: {type: 'date', require: true}
        }
    };
};