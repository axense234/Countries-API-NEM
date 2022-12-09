const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const AuthenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Not authorized." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: error.message });
  }
};

module.exports = AuthenticationMiddleware;
