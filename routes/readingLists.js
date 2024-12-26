const express = require("express");
const router = express.Router();
const tokenExtractor = require("../middleware/tokenExtractor");

const { addToReadingList, markAsRead } = require("../controllers/readingLists");

//router.route("/").post(tokenExtractor, addToReadingList);
router.route("/").post(addToReadingList);
router.route("/:id").put(tokenExtractor, markAsRead);

module.exports = router;
