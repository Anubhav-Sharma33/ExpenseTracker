import jwt from "jsonwebtoken";

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
            await jwt.verify(token,process.env.Secret_Key); 
            next();
        }
    }catch(error){
        console.log(error);
        res.status(404).json({message:"Authentication Failed"})
    }
}