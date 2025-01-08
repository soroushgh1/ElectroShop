import prisma from "../prismaclient";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const AuthCheck = async (req, res, next) => {
    try {
        const accessToken = req.cookies.AccessToken;
        const refreshToken = req.cookies.RefreshToken;

        if(!accessToken || !refreshToken) {
            return res.status(400).json({ error: "Tokens are missing." })
        }

        const verifyAccess = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, user) => {
            if(err){
                return res.status(400).json({ error: err.message });
            }
            req.user = user;
            next();
        })
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}