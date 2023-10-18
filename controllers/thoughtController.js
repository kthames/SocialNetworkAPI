const {ObjectId} = require('mongoose').Types;
const {User, Thought} = require('../models');
const Reaction = require('../models/Reaction');

module.exports = {
// **`/api/thoughts`**

// * `GET` to get all thoughts
async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// * `GET` to get a single thought by its `_id`
async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.courseId })
        .select('-__v')
        .lean();

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// * `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const thoughtId = (thought._id).toString();
      
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thoughtId} },
        { runValidators: true, new: true }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// ```json
// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
// ```

// * `PUT` to update a thought by its `_id`

// * `DELETE` to remove a thought by its `_id`

// ---

// **`/api/thoughts/:thoughtId/reactions`**

// * `POST` to create a reaction stored in a single thought's `reactions` array field

// * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

}