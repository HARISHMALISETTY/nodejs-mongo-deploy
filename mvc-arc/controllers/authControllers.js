const signup = require("../models/signupModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_secret_key = "hjdcvfknjdvnfk";

async function toEncrypt(input) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(input, salt);
  } catch (e) {
    console.log(e);
  }
}

async function comparePasswords(password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (e) {
    console.log(e);
  }
}

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const pp = req.file;
  console.log(pp);

  if (!name || !email || !password) {
    return res.status(400).send({ message: "please fill all fileds" });
  }

  const existingUser = await signup.findOne({ email });
  if (existingUser) {
    return res.status(409).send({ message: "email already exists" });
  }

  let encryptedPswd = await toEncrypt(password);
  const signupData = new signup({
    name: name,
    email: email,
    password: encryptedPswd,
    profilePic: pp.path,
  });
  await signupData.save();

  res.send("registered successfully");

  console.log(name, email, encryptedPswd);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "please fill all fileds" });
  }

  const user = await signup.findOne({ email });
  if (!user) {
    return res.status(401).send({ message: "invalid email id" });
  }

  const isValidPassword = await comparePasswords(password, user.password);

  if (!isValidPassword) {
    return res.status(401).send({ message: "invalid password" });
  }

  const token = jwt.sign(
    { user_id: user._id, email: user.email },
    jwt_secret_key
  );

  res
    .status(200)
    .send({ message: "login successfull", username: user.name, token: token });
};
