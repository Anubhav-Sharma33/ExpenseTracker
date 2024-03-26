import {Router} from "express";
import { createUser, signIn } from "../../middleware/userController.js";
import { authMiddleWare } from "../../middleware/authMiddleware.js";

export const userRouter = Router();

userRouter.get('/signIn',signIn)

userRouter.post('/signUp',createUser);

userRouter.use(authMiddleWare);
userRouter.get('/expenses',(req,res)=>{
    res.status(200).json({message:"Getting Expenses"});
})

