import { Response, Request } from "express";
import { Item } from "../model/ItemModel";
import { toObjectId } from "../utils";
import { Types } from "mongoose";

export const addItem = async (req: Request, res: Response) => {
  let { name, description, price, image_uri, category, is_veg, is_speical} = req.body;
  const item = new Item();
  item.name = name;
  item.description = description;
  item.price = price;
  item.image_uri = image_uri;
  item.category = category;
  item.is_speical = is_speical;
  item.is_veg = is_veg;
  await item.save();
  res.json({
    status: "Success",
    itemId: item._id
  });
  res.end();
}
export const getItems = async (req: Request, res: Response) => {
  const items = await Item.find({}).exec();
  res.json({
    status: "Success",
    items: items
  });
}
export const getItem = async (req: Request, res: Response) => {
  let { itemId } = req.params;
  let itemObjId = toObjectId(itemId);
  const items =  await Item.findOne({ _id: itemObjId }).exec();
  res.json({
    status: "Success",
    items: items
  });
}
export const searchItems = async (req: Request, res: Response) => {
  if (typeof req.query.search != "string") 
  {
    res.json({
      "status": "Failed",
      "error" : "The string parameter is not a string"
    })
    res.end()
    return;
  }
  let search :string = req.query.search;
  const items = await Item.find({ name : search })
  res.json({
    status: "Success",
    items: items
  });
}
