import prisma from "../../prismaclient";
import slugify from "slugify";

export const CreateProduct = async (req, res) => {
    try {
        
        const { name, price, quantity } = req.body;

        if(!name || !price || !quantity) return res.status(400).json({ error: err.message });

        if(typeof(name) !== "string" || typeof(price) !== "number" || typeof(quantity) !== "number") return res.status(400).json({ error: "The format of requested data is wrong." });
        let codeSlug = slugify(name, { strict: true, lower: true });

        const isCodeExist = await prisma.product.findUnique({ where: { code: productCode }});

        let count;

        while(isCodeExist) {
            count++
        }
        const productCode = `${codeSlug}-${count}`;

        const newProduct = await prisma.product.create({ data: { name: name, price: price, quantity: quantity, code: productCode }, select: { name: true,
            price: true, code: true
        }});
        return res.status(201).json(newProduct);
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}