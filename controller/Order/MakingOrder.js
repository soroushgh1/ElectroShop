import axios from "axios";
import prisma from "../../prismaclient.js";
import { v4 as uuidv4 } from 'uuid';

export const MakeOrder = async (req, res) => {
    try {
        
        const { address } = req.body;
        if(!address) return res.status(400).json({ error: "Address is empty." });

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
                },
                address: address
            }
        })

        const deleteItemcart = await prisma.itemcart.deleteMany({ where: { userid: user.id }});

        const updateCart = await prisma.cart.update({ where: {userid: user.id }, data: { payprice: 0 }});

        const zibalReqBody = {
            merchant: "zibal",
            amount: `${order.total_amount}0`,
            callbackUrl: "://localhost:3000/api/order/callbackhttp",
            orderId: uuidv4(),
        }

        const zibalResponse = await axios.post("https://gateway.zibal.ir/v1/request", zibalReqBody);

        if(zibalResponse.data.result !== 100){
            return res.status(400).json({ error: zibalResponse.data.message});
        }

        const payMoney = await axios.get(`https://gateway.zibal.ir/start/${zibalResponse.data.trackId}`);

        return res.status(200).json({ message: "Order created, wait for the payment." });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}