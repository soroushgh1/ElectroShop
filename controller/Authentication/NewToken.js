import prisma from "../../prismaclient.js";
import jwt from "jsonwebtoken";

export const NewToken = async (req, res) => {

    try {

        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken) return res.status(400).json({ error: "Login required." });

        const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const newToken = jwt.sign({ email: user.email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });

        res.cookie("accessToken", newToken, { httpOnly : true });

        return res.status(200).json({ message: "New access token set" });

    } catch (err) {
        
        return res.status(400).json({ error: err.message });
    }
}