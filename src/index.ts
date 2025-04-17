import express, { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./view/UserView";

const app = express()
const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb+srv://tanish:MXtnsVNRVzrzgUE1@food-delivery.gmxli.mongodb.net/Food-delivery?retryWrites=true&w=majority"

app.use(cors())
app.use((_req:Request, res: Response, next: NextFunction) =>{
  res.set({
    "Content-type": "application/json"
  })
  next();
});

app.use(express.json())

app.use(userRouter);

app.listen(PORT,async () =>{
  await mongoose.connect(MONGO_URI);
  console.log("Server runing on " + PORT);
})



