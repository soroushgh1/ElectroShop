import { Router } from "express";
import { CreateProduct } from "../controller/Products/CreateProduct.js";
import { AuthCheck } from "../middleware/AuthCheck.js";
import { GetOneProduct, GetAll } from "../controller/Products/GetProducts.js";

const router = Router();

router.post('/create', AuthCheck, CreateProduct);

router.get('/', GetAll);

router.get('/:id', GetOneProduct);

export default router;