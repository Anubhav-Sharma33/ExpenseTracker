import jwt from 'jsonwebtoken';
import { User } from '../model/userSchema.js';
import { expense } from '../model/expenseSchema.js';

async function getId(token){
    const {email} =  await jwt.verify(token,process.env.Secret_Key);
    const info = await User.find({email});
    const id = info[0]._id;
    return id;
}

export async function getExpenses(req,res,next){
    const token = req.headers.authorization;
    const id = await getId(token);
    const expenses = await expense.find({user:id});
    res.status(200).json({message:"Expenses Fetched Succesfully",expenses});
}

export async function addExpense(req,res,next){
    try{
        const token = req.headers.authorization;
        const id = await getId(token);
        const newExpense = new expense({
            ...req.body,
            user:id,
            })
        await newExpense.save();
        res.status(200).json({message:"Added Expense"});
    }catch(error){
        console.log(error.message);
        console.log("Expense not added due to server error");
        res.status(400).json({message:"Unable to add Expense"});
    }
}

export async function deleteExpense(req,res){
    try{
        const id = req.params.id;
        console.log(typeof id);
        const response = await expense.deleteOne({_id:id});
        res.status(200).json({message:"Deleted Expense"});
    }catch(error){
        console.log("Error");
        res.status(400).json({message:"Cannot Delete"});
    }

}

export async function updateExpense(req,res,next){
    try{
        const id = req.params.id;
        const updatedBody = req.body;
        await expense.findByIdAndUpdate(id,updatedBody);
        res.status(200).json({message:"Updated Expense"});
    }catch(error){
        console.log("Error");
        res.status(400).json({message:"Unable to Update"});
    }


}