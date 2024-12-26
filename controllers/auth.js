const { User, Session } = require("../models");
const { comparePassword } = require("../util/helper");
const { SECRET } = require("../util/config");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  // Return a token
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(404).json({ error: "invalid username" });
  }

  const passwordCorrect = await comparePassword(password, user.passwordHash);
  if (!passwordCorrect) {
    return res.status(401).json({ error: "invalid password" });
  }

  if (user.disabled) {
    return response.status(401).json({
      error: "account disabled, please contact admin",
    });
  }


  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);
  //console.log(token)
  await Session.create({ token, userId: user.id });
  
  return res
    .status(200)
    .json({ token, username: user.username, name: user.name });
};

const logout = async (req, res) => {
  // Logout a user by deleting the session
  const session = await Session.findByPk(req.sessionId);
  //console.log(session)
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  await session.destroy();
  return res.status(204).end();
}

module.exports = {
  login,
  logout
};
