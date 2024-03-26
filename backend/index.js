import express from "express";
import cors from "cors";
import { mainRouterV1 } from "./Router/V1Routes/mainRouterV1.js";
import { connectToDatabase } from "./config/database.js";
import { config } from "dotenv";
const app = express();
const port = 3000;

config();
connectToDatabase();
app.use(express.json());
app.use(cors())
app.use('/v1',mainRouterV1);

app.listen(port,()=>{
console.log(`Server Started at ${port}`);
})