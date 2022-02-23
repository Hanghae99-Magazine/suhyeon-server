const express = require("express");
const { body } = require("express-validator");
const validate = require("../middlewares/validator");
const { register, login } = require("../controller/user");

const router = express.Router();

const validateRegister = [
  body("nickname")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .isAlphanumeric()
    .withMessage("숫자와 알파벳을 3글자 이상 입력해주세요."),
  body("user_pw")
    .trim()
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("비밀번호는 4글자 이상 입력해주세요."),
  body("user_pw").custom((value, { req }) => {
    console.log(value.includes(req.body.nickname));
    if (value.includes(req.body.nickname)) {
      throw new Error("비밀번호에 닉네임이 포함되면 안됩니다!");
    }
    if (value !== req.body.pw_check) {
      throw new Error("패스워드가 일치하지 않습니다!!!");
    }
  }),

  validate,
];

router.post("/register", validateRegister, register);
router.post("/login", login);

module.exports = router;
