import prisma from "../../prismaclient.js";

export const DeleteProduct = async (req, res) => {
    try {
        
        if(!req.user.isadmin){
            return res.status(403).json({ error: "Access denied." });
        }
        
        const productid = req.params.id;

        if(!productid) return res.status(400).json({ error : "Product ID is not in URL." });

        const product = await prisma.product.findUnique({ where: { code: productid }});

        if(!product) return res.status(404).json({ error: "Product not found." });

        await prisma.product.delete({ where: { code: productid }});

        return res.status(200).json({ message : "Product deleted successfully." });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}