const {Schema, model} = require('mongoose');

const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
            default: 'Empty thought',
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
          username: {
            type: String, 
            required: 'Please provide a username',
          }, 
          reactions: [Reaction]
    }, 
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionsCount').get(function () {
    return this.reactions.length;
});

thoughtSchema.virtual('formatDate').get(function () {
    return this.createdAt.toDateString();
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;