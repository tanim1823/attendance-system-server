const router = require("express").Router();
const {
  getUsers,
  getUserByID,
  postUser,
  putUserByID,
  patchUserByID,
  deleteUserByID,
} = require("../controller/users");
/**
 * Get user id or email
 */
router.get("/:userID", getUserByID);

/**
 * Update user by id
 * @method Put
 */
router.put("/:userID", putUserByID);

/**
 * Update user by id
 * @method Patch
 */
router.patch("/:userID", patchUserByID);

/**
 * Delete user by id
 * @method delete
 */
router.delete("/:userID", deleteUserByID);

/**
 * Get All Users, includes
 * - filter
 * -sort
 * pagination
 * select properties
 * @route /api/v1/users?sort=["by" , "name"]
 * @method GET
 * @visibility Private
 */
router.get("/", getUsers);

/**
 * Create User
 */
router.post("/", postUser);

module.exports = router;
