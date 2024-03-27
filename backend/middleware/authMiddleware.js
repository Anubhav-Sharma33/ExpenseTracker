import jwt from "jsonwebtoken";
import { User } from "../model/userSchema.js";

export async function authMiddleWare(req,res,next){
    // Logic for validation
    // Extract token 
    // If token not available then res with error token not found
    // If token found then validate if valid let them proceed;
    const token = req.headers.authorization;
    try{
        if(!token){
            res.status(400).json({message:"Token not found"});
        }else{
            const response = await jwt.verify(token,process.env.Secret_Key); 
            const data = await User.find({email:response.email}).exec();
            next();
        }
    }catch(error){
        console.log(error);
        res.status(404).json({message:"Authentication Failed"})
    }
}