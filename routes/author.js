const express = require("express");
const router = express.Router();
const { groupByAuthor } = require("../controllers/author");

router.get("/", groupByAuthor);

module.exports = router;
