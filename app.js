const express = require("express");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

const port = 3000;

const requestMiddleware = (req, res, next) => {
  console.log("Request URL: ", req.originalUrl, "-", new Date());
  next();
};

const app = express();

app.use(requestMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);
app.use("/post", [postRouter]);

app.get("/", (req, res) => {
  res.send("This is MainPage!");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌습니다.");
});
