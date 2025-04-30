import { Router } from "express";
import { addItem,  getItems,  getItem, searchItems} from "../contorller/ItemController";

export const itemRouter = Router();

itemRouter.post("/item/add", addItem);
itemRouter.get("/items", getItems);
itemRouter.get("/item/search", searchItems);
itemRouter.get("/item/:itemId", getItem);
