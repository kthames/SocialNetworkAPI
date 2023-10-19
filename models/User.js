const {Schema, model} = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String, 
      unique: true,
      required: 'Please provide a username',
      trim: true,  
    }, 
    email: {
      type: String,
      required: 'Please provide an email',
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      unique: true, 
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  }, 
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendsCount').get(function () {
  return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;