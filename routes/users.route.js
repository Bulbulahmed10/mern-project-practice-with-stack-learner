const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  patchUserById,
  putUserById,
} = require("../controllers/users.controller");

/**
 * Get user by id
 * @method GET
 */

router.get("/:userId", getUserById);

/**
 * Update user by id
 * @method PATCH
 */

router.patch("/:userId", patchUserById);

/**
 * Update user by id
 * @method PUT
 */

router.put("/:userId", putUserById);

/**
 * Delete user by id
 * @method DELETE
 */

router.delete("/:userId", deleteUserById);

/**
 * Get all user, include
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @route /api/users?sort=["by", "name"]
 * @method GET
 * @visibility Private
 */
router.get("/", getUsers);

/**
 * create user
 * @method POST
 */
router.post("/", createUser);

module.exports = router;
