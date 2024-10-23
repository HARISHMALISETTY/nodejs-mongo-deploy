const jwt = require("jsonwebtoken");
const jwt_secret_key = "hjdcvfknjdvnfk";
const signup = require("../models/signupModels");

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];

  

  if (!token) {
    return res.status(403).send({ message: "no token provided" });
  }
  const token_arr = token.split(" ");

  console.log(token_arr);

  jwt.verify(token_arr[1], jwt_secret_key, async (err, decode) => {
    console.log(decode,"hiii");

    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    

    try {
      const user = await signup.findOne({ _id: decode.user_id });
      console.log(user,"hello")

      if (!user) {
        return res.status(401).send({ message: "unauthorized user" });
      }

      req.user = user;
      next();
    } catch (e) {
      return res.status(500).send({ message: "server error" });
    }
  });
};

module.exports = verifyToken;
