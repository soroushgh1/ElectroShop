import slugify from "slugify";
import prisma from "../../prismaclient.js";

export const UpdateProduct = async (req, res) => {
    try {
        
        const productid = req.params.id;

        if(!productid) return res.status(400).json({ error: "Product ID is not in URL." });

        const { name, description, picture, price, quantity } = req.body;

        const product = await prisma.product.findUnique({ where: { code: productid }});

        if(!product) return res.status(404).json({ error: "Product not found." });

        const now = new Date();

        const reqData = {
            ...(name && { name }),
            ...(description && { description }),
            ...(picture && { picture }),
            ...(price && { price }),
            ...(quantity && { quantity }),
            updated_at: String(now)
        };
        
        if(reqData.name){

            let codeSlug = slugify(reqData.name, { strict: true, lower: true });
            let count = 0;

            let productCode = `${codeSlug}-${count}`;
            let isCodeExist = await prisma.product.findUnique({ where: { code: productCode } });

            while (isCodeExist) {
                count++;
                productCode = `${codeSlug}-${count}`;
                isCodeExist = await prisma.product.findUnique({ where: { code: productCode } });
            }

            const updateData = {...reqData, code: productCode};

            const updatedProduct = await prisma.product.update({ where: { code: productid }, data: updateData });

            return res.status(200).json(updatedProduct);
        }

        const updateData = {...reqData};

        const updatedProduct = await prisma.product.update({ where: { code: productid }, data: updateData})

        return res.status(200).json(updatedProduct);
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}