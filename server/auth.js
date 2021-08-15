const jwt = require("jsonwebtoken");

const JWT_KEY = "YROBOT_JWT_KEY";

const encode = (data) =>
  jwt.sign(data, JWT_KEY, {
    expiresIn: 1000 * 10,
  });

const decode = (token) => {
  return jwt.verify(token, JWT_KEY);
};

module.exports = {
  JWT_KEY,
  encode,
  decode,
};
