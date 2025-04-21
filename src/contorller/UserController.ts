import { Response, Request } from "express";
import { User } from "../model/UserModel";
import { toObjectId } from "../utils";

// /user/:userId GET 
// this endpoint handle geting user info
//
// params: 
// userId: string(should be exactly 24 characters long)
// Returns
//
// status : Failed | Success,
// data: {
//   name: string ,
//   email: string
// } (only if status is Success)
//   error: string (only if status is failed)

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const user = await User.findById(toObjectId(userId)).exec();
  if (user == null) {
    res.json({
      status: "Failed",
      error: "Id is invalid",
    });
    res.end()
    return;
  }
  res.json({
    status: "Success",
    data: {
      username: user?.username,
      email: user?.email
    }
  });
}

// /user/add POST 
// this endpoint handles the funcnality of user registration and ensuring the unique email 
//
// params: 
// username:string
// email:string
// password:string
// 
// Returns:
//   status : Failed | Success,
//   data: {
//      userId:string,
//   },(only if status is Success)
//   error: string (only if status is failed)

export const addUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  if (username == ""){
    res.json({
      status: "Failed",
      error: "Username should not be empty",
    });
    res.end();
  }
  if (email == ""){
    res.json({
      status: "Failed",
      error: "Email should not be empty",
    });
    res.end();
  }
  if (password == ""){
    res.json({
      status: "Failed",
      error: "Password should not be empty",
    });
    res.end();
  }
  const doesExists = await User.where("email", email).exec();
  if (doesExists) {
    res.json({
      status: "Failed",
      error: "Email Already Exists",
    });
    res.end();
    return;
  }
  const user = new User({ username: username, email: email, password: password });
  await user.save();
  res.json({
    status: "Success",
    data: {
      id: user._id
    }
  })
  res.end();
}

// /user/:userId DELETE
// this endpoint is use to delete the user from database 
//
// params:
// userId: string(should be exactly 24 characters long)
//
// Returns: 
// status: "Success" | "Failed"
// error : string (only if status is failed)
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const userObjId = toObjectId(userId);
  const user = await User.findById(userObjId).exec();
  if (user == null) {
    res.json({
      status: "Failed",
      error: "Id is invalid",
    });
    res.end()
    return;
  }
  await User.deleteOne({ _id: userObjId }).exec();
  res.json({
    status: "Success"
  });
  res.end()
}

// /user/update/
// this endpoint is respnsible for updating the records of user 
//
// params: 
// userId: string(should be exactly 24 characters long)
// pass the atribute u want to update
// username:string
// email:string
// password:string
//
// Returns: 
// status: "Success" | "Failed"
// error : string (only if status is failed)

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  let { userId, username, email, password } = req.body; 
  const userObjId = toObjectId(userId);
  const user =await User.findById(userObjId).exec();
  if (user == null) {
    res.json({
      status: "Failed",
      error: "User ID id invalid",
    });
    res.end();
    return;
  }

  if (username != null){
    user.username = username;
  }
  if (email != null){
    user.email = email;
  }
  if (password != null){
    user.password = password;
  }
  await user.save();
  res.json({
    status : "Success"
  });
  res.end();
}
