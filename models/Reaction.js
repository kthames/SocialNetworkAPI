// **Reaction** (SCHEMA ONLY)

// * `reactionId`
//   * Use Mongoose's ObjectId data type
//   * Default value is set to a new ObjectId

// * `reactionBody`
//   * String
//   * Required
//   * 280 character maximum

// * `username`
//   * String
//   * Required

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

// **Schema Settings**:

// This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.

const {Schema, model} = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        }, 
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
            default: 'No reaction',
          },
          username: {
            type: String, 
            required: 'Please provide a username',
          },
          createdAt: {
            type: Date,
            default: Date.now,
          }
           
    }, 
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

reactionSchema.virtual('formatDate').get(function () {
    return this.createdAt.toDateString();
});

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;