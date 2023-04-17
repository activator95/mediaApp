// Import required modules from mongoose
const { Schema, model, Types } = require('mongoose');

// Define the user schema
const userSchema = new Schema(
  {
    // Define the username field
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    // Define the email field with validation
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    // Define the thoughts field as an array of references to Thought documents
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // Define the friends field as an array of references to User documents
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // Define schema options
    toJSON: {
      virtuals: true, // Include virtual properties when converting to JSON
    },
    id: false, // Exclude the default "_id" field from being returned
  }
);

// Define a virtual property "friendCount" to get the number of friends
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create a User model using the user schema
const User = model('User', userSchema);

// Export the User model
module.exports = User;
