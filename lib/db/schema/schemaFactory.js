const User = require('./schema/user');
const pollSchema = require('./schema/poll');
const Vote = require('./schema/vote');

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
            let UserSchema = new connection.base.Schema(User);

            return {
                User: connection.model('User', UserSchema)
            }
        }
        case 'poll':
        {
            let UserSchema = new connection.base.Schema(User);
            let PollSchema = new connection.base.Schema(pollSchema(connection.base.Schema, UserSchema));
            PollSchema.statics.generateId = function () {
                return new mongoose.Types.ObjectId();
            };

            PollSchema.methods.addVote = function (vote, callback) {
                var optionName = vote.option;
                var optionCorrect = this.data.options.filter(option => option.option === optionName).pop();
                if (!optionCorrect) {
                    return callback('vote option not found');
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