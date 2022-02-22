const express = require("express");
const { Op } = require("sequelize");
const { user, board, likes, comment } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();
