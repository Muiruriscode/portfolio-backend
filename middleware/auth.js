const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.send("failed");
  }

  const tokens = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(tokens, process.env.JWT_SECRET);
    console.log(payload);
    req.user = {
      userId: payload.userId,
      username: payload.username,
      email: payload.email,
    };
    next();
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

module.exports = authenticationMiddleware;
