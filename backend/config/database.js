import mongoose from 'mongoose';

export async function connectToDatabase(){
    try{
        await mongoose.connect(process.env.MongoURL);
        console.log("Database Connected");
    }catch(error){
        console.log(error.message);
        console.log("Unable to connect to Database");
    }
}