module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (authHeader) {
    return res.staus(401).send({ msg: "잘못된 접근입니다." });
  }
  next();
};
