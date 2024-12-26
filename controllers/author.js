const { Blog } = require("../models");
const { sequelize } = require("../util/db");

const groupByAuthor = async (req, res) => {
  // Group blogs by author

  //understand this piece of code later
  const blogs = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("id")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: ["author"],
    order: [[sequelize.fn("SUM", sequelize.col("likes")), "DESC"]],
  });
  return res.status(200).json(blogs);
};

module.exports = {
  groupByAuthor,
};
