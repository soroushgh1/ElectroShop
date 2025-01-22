import { Router } from "express";
import { AddToCart } from "../controller/cart/AddToCart.js";
import { AuthCheck } from "../middleware/AuthCheck.js";
import { RemoveFromCart } from "../controller/cart/RemoveFromCart.js";

const router = Router();

router.post("/add/:id", AuthCheck, AddToCart);

router.post("/remove/:id", AuthCheck, RemoveFromCart);

export default router;
