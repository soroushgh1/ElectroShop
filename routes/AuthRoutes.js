import { Router } from "express";
import { RegisterUsers } from "../controller/Authentication/RegisterUsers.js";
import { LoginUsers, LogoutUsers } from "../controller/Authentication/LoginUsers.js";
import { AuthStatus } from "../controller/Authentication/AuthStatus.js";
import { NewToken } from "../controller/Authentication/NewToken.js";
import { AddSuperUser } from "../controller/Authentication/AddSuperUser.js";
import { LoginSuperUser, LogoutSuperUser } from "../controller/Authentication/LoginSuperUser.js";


const router = Router();


router.post("/register", RegisterUsers);

router.post("/login", LoginUsers);

router.post("/logout", LogoutUsers);

router.post("/authstatus", AuthStatus);

router.post("/newtoken", NewToken);

router.post("/magicportIN", AddSuperUser);

router.post("/magicportUP", LoginSuperUser);

router.post("/magicportOUT", LogoutSuperUser);

export default router;