import { Router } from "express";
import { addToCart, viewCart, clearCart, updateCart } from "../contorller/CartController";
 

export const cartRouter = Router();

cartRouter.post("/cart/add", addToCart);
cartRouter.get("/cart/:userId", viewCart);
cartRouter.post("/cart/clear", clearCart);
cartRouter.post("/cart/update", updateCart);
