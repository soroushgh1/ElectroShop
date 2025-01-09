import { Router } from "express";
import { CreateProduct } from "../controller/Products/CreateProduct.js";
import { AuthCheck } from "../middleware/AuthCheck.js";
import { GetOneProduct, GetAll } from "../controller/Products/GetProducts.js";
import { DeleteProduct } from "../controller/Products/DeleteProduct.js";
import { UpdateProduct } from "../controller/Products/UpdateProduct.js";

const router = Router();

router.post('/create', AuthCheck, CreateProduct);

router.get('/', GetAll);

router.get('/:id', GetOneProduct);

router.delete('/delete/:id', AuthCheck, DeleteProduct);

router.put('/update/:id', UpdateProduct);

export default router;