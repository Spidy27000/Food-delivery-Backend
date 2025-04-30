import { model, ObjectId, Schema } from "mongoose";

export type IItem = Document & {
  name : string,
  description : string,
  price : number,
  image_uri : string,
  is_speical : boolean
  is_veg : boolean,
  category : [string]
}

const ItemSchema = new Schema<IItem>({
  name : {type: String, required : true},
  description : {type : String, required: true},
  price : {type: Number, required: true},
  image_uri: {type: String},
  is_veg : {type: Boolean, required : true},
  is_speical : {type: Boolean, required : true},
  category: {type: [String]},
});


export const Item = model<IItem>("Item", ItemSchema);
Item.createCollection();
