import prisma from "../../prismaclient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const LoginSuperUser = async (req, res) => {

    try {
        
        const { email, password } = req.body;
        if(!email || !password) return res.status(400).json({ error: "Requested data can not be empty." });

        if(typeof(email) !== "string" || typeof(password) !== "string") return res.status(400).json({ error: "Format of data is invalid." });

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const isEmailValid = emailPattern.test(email);

        if(!isEmailValid) return res.status(400).json({ error: "Email format is invalid." });

        const isExist = await prisma.user.findUnique({ where: {email: email}});
        if(!isExist) return res.status(404).json({ error: "User not found." });

        const comparePassword = await bcrypt.compare(password, isExist.password);
        if(!comparePassword) return res.status(400).json({ error: "Email or password is wrong." });

        const accessToken = jwt.sign({ email: email, isadmin: true }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m"});
        const refreshToken = jwt.sign({ email: email, isadmin: true }, process.env.JWT_ACCESS_SECRET, { expiresIn: "90d"});

        res.cookie("accessToken", accessToken, { httpOnly: true });
        res.cookie("refreshToken", refreshToken, { httpOnly: true });

        return res.status(200).json({ message: "User logged in successfully." });

    } catch (err) {

        return res.status(400).json({ error: err.message });

    }
}

export const LogoutSuperUser =  (req, res) => {

    try {
        
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        return res.status(200).json({ message: "User loged out successfully." });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}