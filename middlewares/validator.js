const { validationResult } = require("express-validator");

function validate(req, res, next) {
  const errors = validationResult(req);
  // console.log(req.body);
  if (errors.isEmpty()) {
    return next();
  }
  console.log(errors);
  return res.status(400).json({ msg: errors.array()[0].msg });
}
module.exports = validate;
