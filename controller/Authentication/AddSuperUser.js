import dotenv from "dotenv";
import prisma from "../../prismaclient.js";
import bcrypt from "bcrypt";

dotenv.config();

export const AddSuperUser = async (req, res) => {

    try {
        
        const { email, fullname, password, adminsecret } = req.body;

        if(!email || !fullname || !password || !adminsecret) return res.status(400).json({ error: "Requested data can not be empty." });

        if(typeof(email) !== "string" || typeof(fullname) !== "string" || typeof(password) !== "string" || typeof(adminsecret) !== "string" ) return res.status(400).json({ error: "Format of requested data is invalid." });

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const isEmailValid = emailPattern.test(email);

        if(!isEmailValid) return res.status(400).json({ error: "Email format is invalid." });

        if(adminsecret !== process.env.ADMIN_SECRET) return res.status(403).json({ error: "You are not admin, have a nice life dear attacker :)) " });

        const hashedPassword = await bcrypt.hash(password, 10);

        const now = new Date();

        const admin = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                fullname: fullname,
                created_at: String(now),
                updated_at: String(now),
                email_verified_at: String(now)
            }, select: { email: true, fullname: true, created_at: true, updated_at: true, email_verified_at: true }
        });

        return res.status(201).json(admin);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}