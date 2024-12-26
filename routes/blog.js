const express = require("express");
const router = express.Router();
const tokenExtractor = require('../middleware/tokenExtractor')

const {
  listAllBlogs,
  addNewBlog,
  deleteBlog,
  changeLikes,
} = require("../controllers/blog");

router.route("/").get(tokenExtractor, listAllBlogs).post(tokenExtractor, addNewBlog); // remove token extractor for get request
router.route("/:id").delete(tokenExtractor, deleteBlog).put(changeLikes);

module.exports = router;
