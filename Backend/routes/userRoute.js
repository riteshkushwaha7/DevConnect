const express = require("express")
const router = express.Router()
const {body} = require("express-validator")
router.post("/signup",[
    body("name").isLength({min:3}).withMessage("Name should be at least 3 characters long."),
    body("email") .isEmail()
  .withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("Password must be atleast 6 characters long.")
],userController.registerUser)
router.post("/login",[
    body("email") .isEmail()
  .withMessage("Invalid Email !"),
    body("password").isLength({min:6}).withMessage("Password must be atleast 6 characters long.")
],userController.loginuser)
router.get("/verify",authmiddleware,(req,res)=>{
  res.status(200).json({ message: "User verified" });
})
module.exports = router