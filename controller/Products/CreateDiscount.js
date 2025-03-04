import prisma from "../../prismaclient";

export const CreateDiscount = async (req, res) => {
    try {
        
        const { name, amount, expire } = req.body;

        if(!name | !amount | !expire) {
            return res.status(400).json({ error: "Requested data can not be empty." });
        }

        const isExist = await prisma.discount.findUnique({ where: { name: name } });
        if(isExist) {
            return res.status(400).json({ error: "Discount already exist." });
        }

        if ( amount > 100 ) {
            return res.status(400).json({ error: "Discount amount can not be more than 100 percent." });
        }

        const discount = await prisma.discount.create({ data: { name: name, expire: expire, amount: amount } });
        
        return res.status(400).json(discount);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}