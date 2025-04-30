import { Request, Response } from "express";
import { Cart } from "../model/CartModel";
import { Types } from "mongoose";
import { toObjectId } from "../utils";
import { IItem, Item } from "../model/ItemModel";

type CartItem = {
  id: string
  item: IItem,
  quantity: number
}

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  let { userId, itemId, quantity } = req.body;
  let userObjId: Types.ObjectId = toObjectId(userId);
  let itemObjId: Types.ObjectId = toObjectId(itemId);

  let cart = await Cart.findOne({ userId: userObjId });
  if (cart == null) {
    cart = new Cart();
    cart.userId = userObjId;
    cart.items = [];
  }
  cart.items.push({ itemId: itemObjId, quantity: quantity });
  await cart.save();
  res.json({
    status: "Success",
  })
  res.end()
}
export const viewCart = async (req: Request, res: Response): Promise<void> => {
  let { userId } = req.params;
  let userObjId: Types.ObjectId = toObjectId(userId);
  let cart = await Cart.findOne({ userId: userObjId }).exec();
  let items: CartItem[] = [];
  if (cart == null ) return;
  for (const element of cart.items) {
    let item = await Item.findById(element.itemId).exec();
    if (item == null) return;
    let ele: CartItem = {
      id: item._id.toString(),
      item: item as IItem,
      quantity: element.quantity
    }
    items.push(ele);
   }
  console.log(items);
  res.json({
    status: "Success",
    items: items
  })
  res.end()
}

export const clearCart = async (req: Request, res: Response): Promise<void> => {
  let { userId } = req.body;
  let userObjId: Types.ObjectId = toObjectId(userId);
  let cart = await Cart.findOne({ userId: userObjId }).exec();
  if (cart == null) {
    res.json({
      status: "Success"
    })
    res.end()
    return;
  }
  cart.items = []
  await cart.save();
  res.json({
    status: "Success"
  })
  res.end()
}
export const updateCart = async (req: Request, res: Response): Promise<void> => {
  let { cartItems, userId } = req.body;
  let userObjId: Types.ObjectId = toObjectId(userId);
  let cart = await Cart.findOne({ userId: userObjId }).exec();
  if (cart == null) return;
  cartItems.forEach(async (element: CartItem, index: number) => {
    let itemObjId: Types.ObjectId = toObjectId(element.id);
    cart.items[index].itemId = itemObjId;
    cart.items[index].quantity = element.quantity
  });
  console.log(cart);
  await cart.save();
  res.json({
    status: "Success",
  })
  res.end()
}
