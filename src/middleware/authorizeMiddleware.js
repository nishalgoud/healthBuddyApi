const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../constants");

const authorizeApi = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];
  if (!token) {
    return res.status(401).send({
      code: 0,
      message: "No bearer token",
    });
  }
  try {
    const { user, roles } = jwt.verify(token, SECRET_KEY);
    req.user = user;
    req.roles = roles;
    next();
  } catch (err) {
    res.status(401).send({
      code: 0,
      message: err.message,
    });
  }
};

module.exports = {
    authorizeApi,
};
