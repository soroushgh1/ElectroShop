import prisma from "../../prismaclient.js";
import bcrypt from "bcrypt";

export const RegisterUsers = async (req, res) => {
    try {
        
        const { email, password, fullname } = req.body;

        if(!email || !password || !fullname) return res.status(400).json({ error: "Requested data can not be empty." });

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const isEmailValid = emailPattern.test(email);

        if(!isEmailValid) return res.status(400).json({ error: "Email format is invalid." });

        const isUserExist = await prisma.user.findUnique({ where: { email: email} });

        if(isUserExist) return res.status(400).json({ error: "User exist with same data." });

        const hashedPassword = await bcrypt.hash(password, 10);

        const now = new Date();

        const newUser = await prisma.user.create({ data: { email: email, password: hashedPassword, fullname: fullname, email_verified_at: String(now), created_at: String(now), updated_at: String(now)  }, select: { email: true, fullname: true } });

        return res.status(201).json(newUser);
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}