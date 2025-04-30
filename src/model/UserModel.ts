import { model, ObjectId, Schema } from "mongoose";

type IUser = Document & {
  username: string
  email: string,
  password: string,
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true ,unique: true},
  password: { type: String, required: true},
});

export const User = model<IUser>("User", UserSchema)
User.createCollection();
