const {ObjectId} = require('mongoose').Types;
const {User, Thought} = require('../models');

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
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
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

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

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
async updateThought(req, res) {
    try {
   
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, 
        { $set: req.body }, 
        { runValidators: true, new: true }
        );
    
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// * `DELETE` to remove a thought by its `_id`
async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      const thoughtId = (thought._id).toString();

      const user = await User.findOneAndUpdate(
        { _id: req.body.userId},
        { $pull: { thoughts: thoughtId} },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json({ message: 'Thought and associated reactions deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },

// **`/api/thoughts/:thoughtId/reactions`**
// * `POST` to create a reaction stored in a single thought's `reactions` array field
async addReaction(req, res) {

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No user thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
// **`/api/thoughts/:thoughtId/reactions/reactionId`**
async deleteReaction(req, res) {
    try {
      const thought= await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}