import prisma from "../../prismaclient.js";

export const MakeOrder = async (req, res) => {
    try {
        
        const user = await prisma.user.findUnique({ where: { email: req.user.email }});
        if(!user) return res.status(404).json({ error: "User not found."});

        const cart = await prisma.cart.findUnique({ where: { userid: user.id }, include: {itemcart: true}});
        if(!cart) return res.status(404).json({ error: "Cart not found."});

        if(cart.itemcart.length == 0) return res.status(403).json({ error: "Cart is empty."});

        const now = new Date();

        const order = await prisma.order.create({ 
            data: {
                userid: user.id,
                order_status: "Unpaid",
                total_amount: cart.payprice,
                created_at: String(now),
                updated_at: String(now),
                order_items: {
                    create: cart.itemcart.map((item) => ({
                        productid: item.productid,
                        quantity: item.quantity,
                        price: item.itemsprice,
                        created_at: String(now),
                        updated_at: String(now)
                    }))
                }
            }
        })

        const deleteItemcart = await prisma.itemcart.deleteMany({ where: { userid: user.id }});

        const updateCart = await prisma.cart.update({ where: {userid: user.id }, data: { payprice: 0 }});

        return res.status(200).json({ message: "Order created, wait for the payment." });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}