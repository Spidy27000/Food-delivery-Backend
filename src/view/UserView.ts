import { Router} from "express";
import { getUser, addUser, deleteUser, updateUser, loginUser } from "../contorller/UserController";

export const userRouter: Router = Router();

userRouter.get("/user/:userId",getUser);
userRouter.post("/user/add", addUser);
userRouter.delete("/user/:userId", deleteUser);
userRouter.post("/user/update", updateUser);
userRouter.post("/user/login", loginUser);
