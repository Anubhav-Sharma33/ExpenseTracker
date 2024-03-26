import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { User } from "../model/userSchema.js";

const saltRound = 5;

export async function signIn(req,res){
    const {email,password} = req.body;
    const token = req.headers.authorization;
    if(token){
        try{
            jwt.verify(token,process.env.Secret_Key); 
            res.status(200).json({message:"Verified Token",token})
        }catch(error){
            console.log(error);
            res.status(404).json({message:"Authentication Failed"})
        }
    }else{
        try{
            const response = await User.find({email:email}).exec();
            if(response.length !== 0){
                const curUser = response[0];
                const match = await bcrypt.compare(password,curUser.password);
                if(match){
                    const username = curUser.username;
                    const payload = {username,email};
                    const token = jwt.sign(payload,process.env.Secret_Key,{expiresIn:'1h'});
                    res.status(200).json({message:"Successfull SignIn",token})
                }else{
                    res.status(400).json({message:"Password is Incorrect"});
                }
            }else{
                res.status(400).json({message:"Not able to find user with email"});
            }
        }catch(error){
            console.log(error);
            res.status(500).json({message:"Sorry Cannot process your request right now"})
        }
    }
} 

export const createUser =  async(req,res)=>{
    const {username,password,email} = req.body;
    const payload = {email,username};
    try{
        const response = await User.find({email:email}).exec();
        if(response.length === 0){
            const hashedPassword = await bcrypt.hash(password,saltRound);
            const newUser = new User({
                email:email,
                username:username,
                password:hashedPassword,
            })
            await newUser.save();
            const token = jwt.sign(payload,process.env.Secret_Key,{expiresIn:'1h'});
            res.status(200).json({message:"User Created",token});
        }else{
            res.status(409).json({message:"Email Already exists"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json("Cannot Procced currently with your request");
    }
}

