import {Router} from "express";
import { createUser, signIn } from "../../middleware/userController.js";
import { authMiddleWare } from "../../middleware/authMiddleware.js";
import { addExpense, deleteExpense, getExpenses, updateExpense } from "../../middleware/ExpenseMiddleware.js";

export const userRouter = Router();

userRouter.get('/signIn',signIn);

userRouter.post('/signUp',createUser);

userRouter.use(authMiddleWare);

// Implement expense route

userRouter.get('/allExpenses',getExpenses);

userRouter.post('/addExpense',addExpense);

userRouter.patch('/updateExpense/:id',updateExpense);

userRouter.delete('/deleteExpense/:id',deleteExpense);


//Add get route for getting expenses
//Add post route for adding expenses
//Add patch route for updating expenses
//Add delete route from deleting expense

