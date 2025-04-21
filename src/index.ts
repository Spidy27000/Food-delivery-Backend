import express, { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config"
import { userRouter } from "./view/UserView";

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors({origin:process.env.VITE_ORIGIN}))

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.set({
    "Content-type": "application/json"
  })
  next();
});

app.use(express.json())

app.use(userRouter);

app.listen(PORT, async () => {
  if (process.env.MONGO_URI != undefined) {
    await mongoose.connect(process.env.MONGO_URI);
  } else {
    console.log("Mongo uri not found")
  }
  console.log("Server runing on " + PORT);
})
