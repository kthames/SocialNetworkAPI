
// * `thoughtText`
//   * String
//   * Required
//   * Must be between 1 and 280 characters

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

// * `username` (The user that created this thought)
//   * String
//   * Required

// * `reactions` (These are like replies)
//   * Array of nested documents created with the `reactionSchema`

// **Schema Settings**:

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

// ---

const {Schema, model} = require('mongoose');

reactionSchema = require('./Reaction');

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
          reactions: [reactionSchema]
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