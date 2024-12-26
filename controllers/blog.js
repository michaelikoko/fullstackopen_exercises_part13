const { Blog, User } = require("../models");
const { Op } = require("sequelize");

const listAllBlogs = async (req, res) => {
  // List all blogs
  let where = {};
  if (req.query.search) {
    //where.title = {
    //  [Op.iLike]: `%${req.query.search}%`,
    //};
    where = {
      [Op.or]: {
        title: { [Op.iLike]: `%${req.query.search}%` },
        author: { [Op.iLike]: `%${req.query.search}%` },
      },
    };
  }
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name", "username"],
    },
    where,
    order: [["likes", "DESC"]],
  });
  return res.status(200).json(blogs);
};

const addNewBlog = async (req, res) => {
  // Add a new blog
  const user = await User.findByPk(req.decodedToken.id);
  if (!user) {
    return res.status(404).json({ error: "Unauthorized" });
  }
  const blog = await Blog.create({ ...req.body, userId: user.id });
  return res.status(201).json(blog);
};

const deleteBlog = async (req, res) => {
  // Delete a blog
  const blog = await Blog.findByPk(req.params.id);
  const user = await User.findByPk(req.decodedToken.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  if (blog.userId !== user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  await blog.destroy();
  return res.status(204).end();
};

const changeLikes = async (req, res) => {
  // Change number of likes
  const blog = await Blog.findByPk(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  await blog.update({ likes: req.body.likes });
  return res.status(200).json(blog);
};

module.exports = {
  listAllBlogs,
  addNewBlog,
  deleteBlog,
  changeLikes,
};
