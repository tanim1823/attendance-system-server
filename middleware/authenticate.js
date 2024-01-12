const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const decode = jwt.verify(token, "secret");
    const user = await User.findById(decode._id);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    res.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authenticate;
