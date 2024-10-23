const express=require("express");

const router=express.Router();

const authControllers=require("../controllers/authControllers");
const userController=require("../controllers/userControllers")
const multer=require("multer");
const verifyToken=require("../middlewares/jwt")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,__dirname);
    },

    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})

const upload=multer({storage:storage})



router.post("/signup",upload.single("profilePic"),authControllers.signup);
router.post("/login",authControllers.login);
router.get("/user",verifyToken,userController.getUsers);

module.exports=router;