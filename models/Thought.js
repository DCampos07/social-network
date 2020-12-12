const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: "You must enter a reaction",
      trim: true,
      minlength: [4, "Oh no! That's not enough characters."],
      maxlength: [280, "Opps, that's too many characters"]
    },

    userName: {
      type: String,
      required: "Seems you forgot to write your username"
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const ThoughtSchema = new Schema(
  {
    userName: {
      type: String,
      required: "Seems you forgot to write your name"
    },
    thoughtText: {
      type: String,
      required: "You must write down your thougth",
      trim: true,
      minlength: [4, "Oh no! That's not enough characters."],
      maxlength: [280, "Oops, that's too many characters"]

    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    // use ReactionSchema to validate data for a reply
    reaction: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reaction.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;