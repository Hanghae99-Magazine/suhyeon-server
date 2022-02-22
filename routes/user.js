const express = require("express");
const jwt = require("jsonwebtoken");
const { user } = require("../models");
require("dotenv").config();
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
router.post("/login", async (req, res) => {
  try {
    const { user_id, user_pw } = req.body;

    const users = await user.findOne({
      where: { userId: user_id, password: user_pw },
    });

    if (!users) {
      res.status(400).send({
        msg: "아이디 또는 비밀번호가 틀렸습니다.",
      });
      return;
    }
    const userObject = await user.findOne({ where: { userId: user_id } });
    const nickname = userObject["dataValues"]["nickname"];
    console.log(nickname);
    const token = jwt.sign(
      { userId: user_id, password: user_pw },
      process.env.JWT_SECRET
    );
    res.send({
      mytoken: token,
      nickname: nickname,
      msg: "로그인에 성공했습니다.",
    });
  } catch (err) {
    res.status(400).send({ msg: "로그인에 실패했습니다." });
  }
});

module.exports = router;
