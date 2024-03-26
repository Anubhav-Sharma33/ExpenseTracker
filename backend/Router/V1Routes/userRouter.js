import {Router} from "express";
import { createUser, signIn } from "../../middleware/userController.js";
import { authMiddleWare } from "../../middleware/authMiddleware.js";

export const userRouter = Router();

userRouter.get('/signIn',signIn)

userRouter.post('/signUp',createUser);

userRouter.use(authMiddleWare);

// Impelement expense route

userRouter.get('/allExpenses',(req,res)=>{
    res.status(200).json({message:`${req.userEmail} ${req.objectId}`})
});

userRouter.post('/addExpense');

userRouter.patch('/expense/:id');

userRouter.delete('/expense/:id');


//Add get route for getting expenses
//Add post route for adding expenses
//Add patch route for updating expenses
//Add delete route from deleting expense

