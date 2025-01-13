import prisma from "../../prismaclient.js";

export const  ChangeTheCategory = async (req, res) => {

    try {
        
        const productID = req.params.id;
        const { category_name } = req.body;

        if(!productID) return res.status(400).json({ error: "Product ID is not in URL." });
        if(!category_name) return res.status(400).json({ error: "Requested data can not be empty." });

        const product = await prisma.product.findUnique({ where: { code: productID }});
        const category = await prisma.category.findUnique({ where: {slug: category_name }});

        if(!product) return res.status(404).json({ error: "Product not found." });
        if(!category) return res.status(404).json({ error: "Category not found." });

        const updatedProduct = await prisma.product.update({ where: {code: productID}, data: {categoryid: category.id }, select: {name: true, price: true, description: true, picture: true, code: true, created_at: true, updated_at: true, category: { select: { name: true, slug: true, created_at: true, updated_at: true}}}});

        return res.status(200).json(updatedProduct);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}