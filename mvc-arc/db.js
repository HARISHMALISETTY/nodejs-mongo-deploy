const { mongoose } = require("mongoose");


function dbConnect(){
mongoose
  .connect("mongodb+srv://10000coderstasks:z2HAwH9A2B2D2cad@cluster-final-new.2o2sg.mongodb.net/facebook")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => console.log(err));}

  module.exports={dbConnect}

  