const {Schema, Types} = require('mongoose');

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

module.exports = reactionSchema;