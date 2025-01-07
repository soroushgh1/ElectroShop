import { Router } from "express";
import { RegisterUsers } from "../controller/Authentication/RegisterUsers.js";
import { LoginUsers } from "../controller/Authentication/LoginUsers.js";

const router = Router();

router.post("/register", RegisterUsers);

router.post("/login", LoginUsers);

export default router;