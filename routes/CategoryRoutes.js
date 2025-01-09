import { Router } from "express";
import { CreateCategory  } from "../controller/Category/CreateCategory.js";
import { AuthCheck } from "../middleware/AuthCheck.js";
import { GetAllCategories, GetOneCategories } from "../controller/Category/GetCategories.js";


const router = Router();

router.post('/create',AuthCheck, CreateCategory);

router.get('/', GetAllCategories);

router.get('/:id', GetOneCategories);

export default router;