const jwt = require("jsonwebtoken");
const { findByUserId } = require("../data/user");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json({ msg: "로그인 후 사용하세요." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
    if (error) {
      return res.status(401).json({ msg: "로그인 후 사용하세요." });
    }
    const users = await findByUserId(decoded.id);

    if (!users) {
      return res.status(401).json({ msg: "로그인 후 사용하세요." });
    }
    req.userId = users.dataValues.userId; // req.customData
    next();
  });
};
