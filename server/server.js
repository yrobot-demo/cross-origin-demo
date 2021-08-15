const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;


const token = 'yrobot-demo-token'


app.use('/static', express.static('public'));

// var whitelist = ["http://cross:5500", "http://yrobot.top"];

// app.use(
//   cors((req, callback) => {
//     if (whitelist.includes(req.header("Origin"))) {
//       callback(null, {
//         origin: true,
//         credentials: true,
//       });
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   })
// );

app.use(bodyParser.json());

app.use(cookieParser());

app.get("/login", (req, res) => {
  res.json({ token });
});

app.post("/login", function (req, res) {
  res.json({ token });
});

app.use(function (err, req, res, next) {
  if (err) console.log(err.message);
  next();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
