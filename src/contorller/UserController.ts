import { Response, Request } from "express";
import { User } from "../model/UserModel";
import { toObjectId } from "../utils";

// /user/:userId GET 
// params: 
// userId: string
// Returns
// {
//   status : Failed | Success,
//   data: {
//      name: string ,
//      email: string
//   }
// }
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  console.log("hello");
  console.log(toObjectId(userId));
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
// params: 
// username:string
// email:string
// password:string
// Returns
// {
//   status : Failed | Success,
//   data: {
//      userId:string,
//   }
//   error: string
// }
export const addUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  console.log(req.body);
  const doesExists = await User.where("email", email).exec();
  if (doesExists){
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
  res.end()
}

