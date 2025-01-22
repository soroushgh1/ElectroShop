import { Router } from "express";
import { AddToCart } from "../controller/cart/AddToCart.js";
import { AuthCheck } from "../middleware/AuthCheck.js";
import { RemoveFromCart } from "../controller/cart/RemoveFromCart.js";
import { GetCart } from "../controller/cart/GetCart.js";

const router = Router();

router.post("/add/:id", AuthCheck, AddToCart);

router.post("/remove/:id", AuthCheck, RemoveFromCart);

router.post("/mycart", AuthCheck, GetCart);

export default router;
