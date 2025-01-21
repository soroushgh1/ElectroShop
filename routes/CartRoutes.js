import { Router } from "express";
import { AddToCart } from "../controller/cart/AddToCart.js";
import { AuthCheck } from "../middleware/AuthCheck.js";

const router = Router();

router.post("/add/:id", AuthCheck, AddToCart);

export default router;