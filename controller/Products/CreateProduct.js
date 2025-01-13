import prisma from "../../prismaclient.js";
import slugify from "slugify";

export const CreateProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, picture } = req.body;

        if (!name || !price || !quantity || !description || !picture ) {
            return res.status(400).json({ error: "All fields are required." });
        }

        if (typeof name !== "string" || typeof price !== "number" || typeof quantity !== "number" || typeof description !== "string" || typeof picture !== "string") {
            return res.status(400).json({ error: "The format of requested data is wrong." });
        }

        let codeSlug = slugify(name, { strict: true, lower: true });
        let count = 0;

        let productCode = `${codeSlug}-${count}`;
        let isCodeExist = await prisma.product.findUnique({ where: { code: productCode } });

        while (isCodeExist) {
            count++;
            productCode = `${codeSlug}-${count}`;
            isCodeExist = await prisma.product.findUnique({ where: { code: productCode } });
        }

        const now = new Date();

        const newProduct = await prisma.product.create({
            data: {
                name: name,
                price: price,
                quantity: quantity,
                description: description,
                code: productCode,
                picture: picture,
                created_at: now,
                updated_at: now
            },
            select: {
                name: true,
                description: true,
                price: true,
                code: true,
                picture: true
            }
        });

        return res.status(201).json(newProduct);
    } catch (err) {
        return res.status(500).json({ error: err.message }); 
    }
}