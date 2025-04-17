import { Types } from "mongoose";

export const toObjectId = (id:string) : Types.ObjectId =>{
  //let hexString = 
  return new Types.ObjectId(id);
}
