const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateExistingUser,
  removeUser,
  addFriend,
  removeFriend
} = require("../../controllers/userController");

// /api/users GET all and POST user
router.route("/").get(getAllUsers).post(createNewUser);

// /api/users/:userId GET one user, PUT and DELETE by ID
router.route("/:userId")
  .get(getUserById)
  .put(updateExistingUser)
  .delete(removeUser);

// /api/users/:userId/friends/:friendId POST and DELETE friends
router.route("/:userId/friends/:friendId")
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;