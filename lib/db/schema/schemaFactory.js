"use strict";

const userSchema = require('./user');
const pollSchema = require('./poll');
const Vote = require('./vote');
const crypto = require('crypto');

function buildUserSchema(connection) {
    let UserSchema = new connection.base.Schema(userSchema(connection.base.Schema));

    UserSchema.methods.validPassword = function(password) {
        var hash = crypto
            .createHash("md5")
            .update(password)
            .digest('hex');

        return this.password === hash;
    };

    return UserSchema;
}

function getSchema(name, connection) {
    switch (name) {
        case 'vote':
        {
            let VoteSchema = new connection.base.Schema(Vote);

            return {
                Vote: connection.model('Vote', VoteSchema)
            }
        }
        case 'user':
        {
            return {
                User: connection.model('User', buildUserSchema(connection))
            }
        }
        case 'poll':
        {
            let UserSchema = buildUserSchema(connection);
            let PollSchema = new connection.base.Schema(pollSchema(connection.base.Schema));
            PollSchema.statics.generateId = function () {
                return new mongoose.Types.ObjectId();
            };

            PollSchema.methods.addVote = function (data, callback) {
                var saveUser = !!this.data.saveUser;

                if(saveUser && !data.user) {
                    return callback('poll requires user to be passed');
                }

                var optionName = data.vote.option;
                var optionCorrect = this.data.options.filter(option => option.option === optionName).pop();
                if (!optionCorrect) {
                    return callback('VOTE_NOT_FOUND');
                } else if(!optionCorrect.enabled) {
                    return callback('VOTE_NOT_ENABLED')
                }

                this.data.votes = this.data.votes || {};
                this.data.votes[optionName] = isNaN(this.data.votes[optionName]) ? 1 : this.data.votes[optionName] + 1;
                this.update({data: this.data}, callback);
            };

            return {
                User: connection.model('User', UserSchema),
                Poll: connection.model('Poll', PollSchema)
            }
        }
    }
}

exports.getSchema = getSchema;