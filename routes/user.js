const express = require("express");
const { check, body } = require("express-validator");
const validate = require("../middlewares/validator");
const { register, login, logout, me } = require("../controller/user");
const authMiddleware = require("../middlewares/auth-middleware");
const loginCheckMiddleware = require("../middlewares/login-check-middleware");

const router = express.Router();

const validateRegister = [
  body("nickname")
    .notEmpty()
    .withMessage("닉네임을 입력해주세요.")
    .isLength({ min: 3 })
    .withMessage("닉네임을 3글자 이상 입력해주세요.")
    .isAlphanumeric()
    .withMessage("닉네임은 숫자와 알파벳을 입력해주세요."),
  body("user_pw")
    .notEmpty()
    .withMessage("비밀번호를 입력해주세요.")
    .isLength({ min: 4 })
    .withMessage("비밀번호는 4글자 이상 입력해주세요.")
    .custom((value, { req }) => {
      console.log(value.includes(req.body.nickname));
      if (value.includes(req.body.nickname)) {
        throw new Error("비밀번호에 닉네임이 포함되면 안됩니다!");
      }
      return true;
    })
    .custom((value, { req }) => {
      if (value !== req.body.pw_check) {
        throw new Error("패스워드가 일치하지 않습니다.");
      }
      return true;
    }),
  validate,
];

router.post("/register", [loginCheckMiddleware, validateRegister], register);
router.post("/login", loginCheckMiddleware, login);
router.delete("/logout", authMiddleware, logout);
router.get("/user/me", authMiddleware, me);

module.exports = router;
