const express = require("express");
const postRouter = require("./routes/post");

const { json } = require("body-parser");
const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/post", [postRouter]);
app.get("/", (req, res) => {
  res.send("This is MainPage!");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌습니다.");
});
