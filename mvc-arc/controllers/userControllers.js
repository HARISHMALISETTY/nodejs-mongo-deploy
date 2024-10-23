const signup = require("../models/signupModels");

exports.getUsers = async (re, res) => {
  try {
    let users = await signup.find();

    res
      .status(201)
      .send({ message: "users retrieved successfully", data: users });
  } catch (errr) {
    res.status(500).send({ message: "error while retrieving users" });
  }
  
};
