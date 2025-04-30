import { Model, model, ObjectId, Schema, Types } from "mongoose";

type ICart  = Document & {
  userId: Types.ObjectId,
  items: {
    itemId: Types.ObjectId,
    quantity: number,
  }[],
}

const CartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  items: [{
      itemId: { type: Schema.Types.ObjectId, ref: "Item" },
      quantity: { type: Number } 
  }]
})

export const Cart = model<ICart>("Cart", CartSchema);
Cart.createCollection();
