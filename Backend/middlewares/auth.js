const jwt = require("jsonwebtoken")

const userModel = require("../models/models.scheme")

const authmiddleware = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message:"Unauthorised"})
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            let user = await userModel.findById(decoded._id)
            
            if(!user){
                 return res.status(401).json({ message: "Unauthorized" });
            }
            next()
        } catch (error) {
           return res.status(401).json({ message: "Unauthorized" });
        }
}
module.exports = authmiddleware