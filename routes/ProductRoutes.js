import { Router } from "express";
import { CreateProduct } from "../controller/Products/CreateProduct";
import { AuthCheck } from "../middleware/AuthCheck";

const router = Router();

router.post('/create', AuthCheck, CreateProduct);

export default router;