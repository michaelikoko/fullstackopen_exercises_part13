const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const { Session } = require("../models");

const tokenExtractor =  async(req, res, next) => {
  // Extract token from request
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const token = authorization.substring(7);
      const decodedToken = jwt.verify(token, SECRET);
      //console.log(token);
      //console.log(decodedToken);
      
      // check session existence and validity
      
      const session = await Session.findOne({ where: { token } });
      //console.log(session);
      if (!session || session.userId !== decodedToken.id) {
        return res.status(401).json({ error: "Invalid token" });
      }

      req.decodedToken = decodedToken;
      req.sessionId = session.id; // This is used in delete controller
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  } else {
    return res.status(401).json({ error: "Token missing" });
  }
  next();
};

module.exports = tokenExtractor;
