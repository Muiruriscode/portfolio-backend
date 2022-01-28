const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.send("failed");
  }

  const tokens = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(tokens, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, username: payload.username };
    next();
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

module.exports = authenticationMiddleware;
