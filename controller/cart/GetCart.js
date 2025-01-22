import prisma from "../../prismaclient.js";

export const GetCart = async (req, res) => {

  try {

    const user = await prisma.user.findUnique({ where: { email: req.user.email } });
    if (!user) return res.status(404).json({ error: "User not found." });

    const cart = await prisma.cart.findUnique({ where: { userid: user.id }, include: { itemcart: true } });
    if (!cart) return res.status(404).json({ error: "User cart not found." });

    return res.status(200).json(cart);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
