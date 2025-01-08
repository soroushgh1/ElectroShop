import { Router } from "express";
import { RegisterUsers } from "../controller/Authentication/RegisterUsers.js";
import { LoginUsers } from "../controller/Authentication/LoginUsers.js";
import { AuthStatus } from "../controller/Authentication/AuthStatus.js";

const router = Router();

router.post("/register", RegisterUsers);

router.post("/login", LoginUsers);

router.post("/authstatus", AuthStatus);


export default router;