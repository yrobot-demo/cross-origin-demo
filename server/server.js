const express = require("express");
const bodyParser = require("body-parser");
const { encode, decode } = require("./auth");

const users = [
  {
    username: "yrobot",
    password: "yrobot-psd",
    age: 24,
    email: "y_robot@yeah.net",
  },
  { username: "xt", password: "xt-psd", age: 21, email: "xt@yeah.net" },
];

const formatRes = (res) => {
  if (res instanceof Error) {
    return {
      error: true,
      errorMsg: res.message || "请求出错",
    };
  } else {
    return {
      error: false,
      errorMsg: "",
      data: res,
    };
  }
};
const app = express();
const port = 3000;

app.use(function (req, res, next) {
  const requestId = Date.now();
  res.set("request-id", requestId);
  next();
});

app.use("/static", express.static("public"));

app.use(bodyParser.json());

app.post("/login", function (req, res) {
  const { username, password } = req.body || {};
  const user = users.find((v) => v.username === username);
  if (user && user.password === password) {
    res.json(
      formatRes({
        token: encode(user),
      })
    );
  } else {
    throw new Error("账号不存在或密码不正确");
  }
});

app.post("/info", function (req, res) {
  const { token } = req.headers || {};
  if (!token) throw new Error("请先登录");
  res.json(formatRes(decode(token)));
});

app.use(function (err, req, res, next) {
  if (err) {
    console.log(err);
    res.json(formatRes(err));
  }
  next();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
