const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

var whitelist = ["http://cross:5500", "http://yrobot.top"];

app.use(
  cors((req, callback) => {
    if (whitelist.includes(req.header("Origin"))) {
      callback(null, {
        origin: true,
        credentials: true,
      });
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  })
);

app.use(bodyParser.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ msg: "Got a GET request" });
});

app.post("/", function (req, res) {
  console.log(req.headers.host);
  console.log(req.cookies);
  console.log(req.signedCookies);
  res.cookie("msg", "Hello World!", { sameSite: "none" });
  res.json({ msg: "Got a POST request" });
});

app.use(function (err, req, res, next) {
  if (err) console.log(err.message);
  next();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
