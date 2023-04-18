const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createNewThought,
  updateExistingThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts GET all and POST thought
router.route("/").get(getAllThoughts).post(createNewThought);

// /api/thoughts/:thoughtId GET one thought, PUT and DELETE by ID
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateExistingThought)
  .delete(removeThought);

//  /api/thoughts/:thoughtId/reactions POST new reactions
router.route("/:thoughtId/reactions").post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId DELETE reaction by ID
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;