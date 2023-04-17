// Import necessary models
const { User, Thought } = require("../models");

// Export controller object with corresponding methods
module.exports ={
  // Retrieve all thoughts
  getAllThoughts(req, res) {
    // Query all thoughts in the database
    Thought.find({})
      .then((allThoughts) => res.json(allThoughts)) // Send the fetched thoughts as a response
      .catch((err) => res.status(500).json(err)); // Handle errors
  },
  // Get a specific thought by ID
  getThoughtById(req, res) {
    // Search for the thought using the provided ID
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v") // Exclude the "__v" field from the response
      .then((foundThought) =>
        !foundThought
          ? res.status(404).json({ message: "No thought found with this ID!" }) // If not found, send a 404 status with a message
          : res.json(foundThought) // Send the fetched thought as a response
      )
      .catch((err) => res.status(500).json(err)); // Handle errors
  },
  // Create a thought and associate it with a user
  addThought(req, res) {
    // Add a new thought with the provided data
    Thought.create(req.body)
      .then(({ _id }) => {
        // Update the user's thoughts array with the new thought's ID
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((updatedUser) =>
        !updatedUser
          ? res.status(404).json({ message: "No user found with this ID!" }) // If the user is not found, send a 404 status with a message
          : res.json(updatedUser) // Send the updated user as a response
      )
      .catch((err) => res.status(500).json(err)); // Handle errors
  },
  // Modify a thought by ID
  editThought(req, res) {
    // Update the thought with the provided data using its ID
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, New: true }
    )
      .then((updatedThought) =>
        !updatedThought
          ? res.status(404).json({ message: "No thought found with this ID!" }) // If not found, send a 404 status with a message
          : res.json(updatedThought) // Send the updated thought as a response
      )
      .catch((err) => res.status(500).json(err)); // Handle errors
  },
// Remove a thought by ID
removeThought(req, res) {
    // Delete the thought using its ID
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((deletedThought) =>
        !deletedThought
          ? res.status(404).json({ message: "No thought found with this ID!" }) // If not found, send a 404 status with a message
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((userWithThoughtRemoved) =>
        !userWithThoughtRemoved
          ? res.status(404).json({ message: "Thought removed, but no user found" }) // If the user is not found, send a 404 status with a message
          : res.json({ message: "Thought successfully removed" }) // Send a success message as a response
      )
      .catch((err) => res.status(500).json(err)); // Handle errors
  },