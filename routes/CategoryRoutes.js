import { Router } from "express";
import { CreateCategory  } from "../controller/Category/CreateCategory.js";
import { AuthCheck } from "../middleware/AuthCheck.js";
import { GetAllCategories, GetOneCategories } from "../controller/Category/GetCategories.js";
import { DeleteCategories } from "../controller/Category/DeleteCategory.js";
import { UpdateCategory } from "../controller/Category/UpdateCategory.js";
import { SearchCategory } from "../controller/Category/SearchCategory.js";


const router = Router();

router.post('/create',AuthCheck, CreateCategory);

router.get('/', GetAllCategories);

router.get('/:id', GetOneCategories);

router.post("/delete/:id", AuthCheck, DeleteCategories);

router.put("/:id", AuthCheck, UpdateCategory);

router.get('/q/:id', SearchCategory);


export default router;