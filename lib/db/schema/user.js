"use strict";

const validate = require('../validation/validation').validateEmail;

module.exports = function(Schema) {
    return {
        email: {
            type: 'string',
            required: true,
            index: {unique: true},
            minlength: 3,
            maxlength: 100,
            validate: {
                validator: validate,
                message: '{VALUE} is not valid email!'
            }
        },
        picture: {type: 'string'},
        pictureOriginal: { type: 'string'},
        password: {type: 'string', minlength: 3, maxlength: 100 },
        firstName: {type: 'string', minlength: 3, maxlength: 100, required: true},
        lastName: {type: 'string', minlength: 3, maxlength: 100, required: true},
        creation: {type: 'date', required: true},
        role: {type: 'string', enum: ['inactive', 'registered', 'admin'], default: 'inactive', required: true},
        polls: [Schema.Types.ObjectId],
        interactionsVoted: ['string'],
        configuration : Schema.Types.Object
    };
};