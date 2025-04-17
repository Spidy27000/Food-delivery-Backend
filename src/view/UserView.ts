import { Router} from "express";
import { getUser, addUser } from "../contorller/UserController";

export const userRouter: Router = Router();

userRouter.get("/user/:userId",getUser);
userRouter.post("/user/add", addUser);
