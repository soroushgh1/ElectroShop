import { Router } from "express";
import { RegisterUsers } from "../controller/Authentication/RegisterUsers.js";
import { LoginUsers } from "../controller/Authentication/LoginUsers.js";
import { AuthStatus } from "../controller/Authentication/AuthStatus.js";
import { NewToken } from "../controller/Authentication/NewToken.js";


const router = Router();


router.post("/register", RegisterUsers);

router.post("/login", LoginUsers);

router.post("/authstatus", AuthStatus);

router.post("/newtoken", NewToken);


export default router;