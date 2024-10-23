const { mongoose } = require("mongoose");

const signupSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profilePic:String
});

const signup = mongoose.model("signup", signupSchema);

module.exports = signup;
