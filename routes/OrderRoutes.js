import { Router } from "express";
import { MakeOrder } from "../controller/Order/MakingOrder.js";
import { AuthCheck } from "../middleware/AuthCheck.js";

const router = Router();

router.post('/orderitems', AuthCheck, MakeOrder);

export default router;