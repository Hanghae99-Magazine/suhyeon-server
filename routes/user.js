const express = require("express");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { user } = require("../models");

const router = express.Router();

// 회원가입
router.post("/register", async (req, res) => {
  try {
    const { user_id, nickname, user_pw, pw_check } = req.body;

    if (user_pw !== pw_check) {
      res
        .status(400)
        .send({ msg: "패스워드가 패스워드 확인란과 동일하지 않습니다." });
      return;
    }
    const existUser = await user.findAll({
      where: { userId: user_id },
    });
    if (existUser.length) {
      res.status(400).send({ msg: "이미 가입된 아이디가 있습니다." });
      return;
    }
    await user.create({
      userId: user_id,
      password: user_pw,
      nickname: nickname,
    });
    res.status(201).send({ msg: "회원가입 되었습니다!" });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: "요청한 데이터 형식이 올바르지 않습니다.",
    });
  }
});

// 로그인
router.post("/login", async (req, res) => {});

module.exports = router;
