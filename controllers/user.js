const { User, Blog } = require("../models");
const { hashPassword } = require("../util/helper");

const createNewUser = async (req, res) => {
  // Adding a new user
  const { name, username, password } = req.body;
  const passwordHash = await hashPassword(password);
  const user = await User.create({ name, username, passwordHash });
  return res.status(201).json(user);
};

const listAllUser = async (req, res) => {
  // Listing all users
  const users = await User.findAll({
    attributes: { exclude: ["passwordHash", "createdAt", "updatedAt"] },
    include: {
      model: Blog,
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
    },
  });
  return res.status(200).json(users);
};

const changeUsername = async (req, res) => {
  // Changing a username
  const user = await User.findOne({ where: { username: req.params.username } });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  user.username = req.body.username;
  await user.save();
  return res.status(200).json(user);
};

const getSingleUser = async (req, res) => {
  // Returns a single user by id
  let where = {}
  if (req.query.read) {
    where.read = req.query.read === 'true';
  }
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["passwordHash", "createdAt", "updatedAt", "id"] },
    include: [
      {
        model: Blog,
        as: "readings",
        attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
        through: {
          attributes: ['read', 'id'],
          where
        }
      },
    ],
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.status(200).json(user);
};

module.exports = {
  createNewUser,
  listAllUser,
  changeUsername,
  getSingleUser,
};
