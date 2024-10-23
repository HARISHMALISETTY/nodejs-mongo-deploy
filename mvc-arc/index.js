const express = require("express");
const app = express();
const { dbConnect } = require("./db.js");

const authRoutes=require("./routes/routes")

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth",authRoutes)
app.get("/",(req,res)=>{res.send("hello")})

app.listen("3000", () => {
    console.log("server running");
  });
  