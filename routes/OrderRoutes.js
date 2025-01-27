import { Router } from "express";
import { MakeOrder } from "../controller/Order/MakingOrder.js";
import { AuthCheck } from "../middleware/AuthCheck.js";
import { PaymentCallback } from "../controller/Order/PaymentCallBack.js";
import { MakePayment } from "../controller/Order/MakePayment.js";

const router = Router();

router.post('/orderitems', AuthCheck, MakeOrder);

router.post('/checkout', AuthCheck, MakeOrder);

router.get('/callback', PaymentCallback);

router.post('/makingpayment', AuthCheck, MakePayment);

export default router;