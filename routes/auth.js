const express = require("express");
const { login, logout } = require("../controllers/auth");
const tokenExtractor = require("../middleware/tokenExtractor");
const router = express.Router();

router.route("/login").post(login);
router.route("/logout").delete(tokenExtractor, logout);

module.exports = router;
