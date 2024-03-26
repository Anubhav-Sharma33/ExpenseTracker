import {Router} from "express";
import  {userRouter} from "./userRouter.js";
import { adminRouter } from "./adminRouter.js";

export const mainRouterV1 = Router();

mainRouterV1.use('/user',userRouter);
mainRouterV1.use('/admin',adminRouter);

