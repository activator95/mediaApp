// Import required modules from mongoose
const { Schema, model, Types } = require('mongoose');
// Import moment module to format the timestamp
const moment = require('moment');

// Define the reaction schema
const reactionSchema = new Schema(
  {
    // Define the reactionId field
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // Define the reactionBody field with validation
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    // Define the username field
    username: {
      type: String,
      required: true,
    },
    // Define the createdAt field with custom getter for formatting the date
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    // Define schema options
    toJSON: {
      virtuals: true, // Include virtual properties when converting to JSON
      getters: true,  // Apply custom getters when converting to JSON
    },
    id: false, // Exclude the default "_id" field from being returned
  }
);

// Define the thought schema
const thoughtSchema = new Schema(
  {
    // Define the thoughtText field with validation
    thoughtText: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 200,
    },
    // Define the createdAt field with custom getter for formatting the date
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    // Define the username field
    username: {
      type: String,
      required: true,
    },
    // Define the reactions field as an array of reactionSchema
    reactions: [reactionSchema],
  },
  {
    // Define schema options
    toJSON: {
      virtuals: true, // Include virtual properties when converting to JSON
      getters: true,  // Apply custom getters when converting to JSON
    },
    id: false, // Exclude the default "_id" field from being returned
  }
);

// Define a virtual property "reactionCount" to get the number of reactions
thoughtSchema.virtual('reactionCount')
.get(function() {
  return this.reactions.length;
});

// Create the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);
// Export the Thought model
module.exports = Thought;
