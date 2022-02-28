const jwt = require("jsonwebtoken");
const { user } = require("../models");
const bcrypt = require("bcrypt");
const userRepository = require("../data/user");
const { Op } = require("sequelize");
require("dotenv").config();

// 회원가입
async function register(req, res) {
  console.log("req", req);
  const { user_id, nickname, user_pw, pw_check } = req.body;
  console.log("debug!!!!!!!!!!!!!!", user_id, nickname, user_pw, pw_check);
  if (user_pw !== pw_check) {
    res
      .status(400)
      .send({ msg: "패스워드가 패스워드 확인란과 동일하지 않습니다." });
    return;
  }
  const existUser = await user.findAll({
    where: { [Op.or]: [{ userId: user_id }, { nickname }] },
  });
  console.log("debug!!!!!!!!!!!!!!", existUser);
  if (existUser.length) {
    res.status(400).send({ msg: "이미 가입된 아이디가 있습니다." });
    return;
  }

  const hashed = await bcrypt.hash(user_pw, Number(process.env.saltRounds));
  const userId = await userRepository.createUser({
    userId: user_id,
    password: hashed,
    nickname,
  });
  const token = createJwtToken(userId);

  res.status(201).send({ msg: "회원가입 되었습니다!" });
}

// 로그인
async function login(req, res) {
  const { user_id, user_pw } = req.body;

  const users = await userRepository.findByUserId(user_id);

  if (!users) {
    res.status(400).send({
      msg: "아이디 또는 비밀번호가 틀렸습니다.",
    });
    return;
  }
  const isValidPassword = await bcrypt.compare(user_pw, users.password);
  if (!isValidPassword) {
    res.status(400).send({
      msg: "아이디 또는 비밀번호가 틀렸습니다.",
    });
    return;
  }

  const nickname = users["dataValues"]["nickname"];
  const token = createJwtToken(user_id);
  res.send({
    mytoken: token,
    nickname: nickname,
    msg: "로그인에 성공했습니다.",
  });
}

function createJwtToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.expiresInSec),
  });
}

async function me(req, res, next) {
  const userId = req.userId;
  const users = await userRepository.findByUserId(userId);
  if (!users) {
    return res.status(404).json({ msg: "User not found" });
  }
  res.status(200).json({ token: req.token, userId: users.userId });
}

module.exports = { register, login, me };
