import prisma from "../../prismaclient.js";
import { v4 as uuidv4 } from "uuid";

export const MakePayment = async (req, res) => {
    
    try {
        
        const user = await prisma.user.findUnique({ where: { email: req.user.email }, include: { orders: true }});

        const order = await prisma.order.findUnique({ where: { userid: user.id }});

        const deleteOrder = await prisma.order.delete({ where: { userid: user.id }});

        const newPayment = await prisma.payment.create({ data: {
            orderid: order.id,
            payment_method: "Zibal",
            amount: order.total_amount,
            payment_status: "Paid",
            transaction_id: uuidv4(),
            created_at: String(new Date()),
            updated_at: String(new Date())
        }})

        return res.status(201).json(newPayment);

    } catch (err) {

        return res.status(500).json({ error: err.message });
    }
}