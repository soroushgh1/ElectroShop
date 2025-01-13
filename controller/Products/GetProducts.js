import prisma from "../../prismaclient.js";


export const GetAll = async (req, res) => {

    try {
        const allProducts = await prisma.product.findMany({select: {name: true, price: true, description: true, picture: true, code: true, created_at: true, updated_at: true }});

        return res.status(200).json(allProducts);
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

export const GetOneProduct = async (req, res) => {

    try {
        const productid = req.params.id;
        
        if(!productid) return res.status(400).json({ error: "Product ID is not in the URL."});

        const product = await prisma.product.findUnique({ where: { code: productid }, select: { name: true, description: true, picture: true,  price: true, code: true, created_at: true, updated_at: true }});

        if(!product) return res.status(404).json({ error: "Product not found." });

        return res.status(200).json(product);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}