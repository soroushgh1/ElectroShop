import prisma from "../../prismaclient.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const LoginUsers = async (req, res) => {

    try {
        
        const { email, password } = req.body;

        if(!email || !password) return res.status(400).json({ error: "Requested data can not be empty." });

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const isEmailValid = emailPattern.test(email);

        if(!isEmailValid) return res.status(400).json({ error: "Email format is invalid." });

        const isUserExist = await prisma.user.findUnique({ where: { email: email }});

        if(!isUserExist) return res.status(400).json({ error: "User does not exist."});

        const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);

        if(!isPasswordMatch) return res.status(400).json({ error: "Email or password is wrong." });

        const accessToken = jwt.sign({ email: email}, process.env.JWT_ACCESS_SECRET || "iamsoroushdeveloper", { expiresIn : '15m' });
        const refreshToken = jwt.sign({ email: email}, process.env.JWT_REFRESH_SECRET || "iamsoroush", { expiresIn : '90d' });

        res.cookie("accessToken", accessToken, { httpOnly: true });
        res.cookie("refreshToken", refreshToken, { httpOnly: true  });

        return res.status(200).json({ message: "User logged in."});
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}