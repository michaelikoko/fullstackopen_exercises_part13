const express = require("express");
const router = express.Router();

const {
  createNewUser,
  listAllUser,
  getSingleUser,
  changeUsername,
} = require("../controllers/user");

router.route("/").get(listAllUser).post(createNewUser);
router.route("/:id").get(getSingleUser);
router.route("/:username").put(changeUsername);

module.exports = router;
