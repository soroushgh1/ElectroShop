import prisma from "../../prismaclient.js";

export const RemoveFromCart = async (req, res) => {
  try {

    const { quantity } = req.body;
    if (!quantity || typeof (quantity) !== "number") return res.status(400).json({ error: "Requested data is invalid or not specfied." });

    const productid = req.params.id;
    if (!productid) return res.status(400).json({ error: "Product ID is not in the URL." });

    const product = await prisma.product.findUnique({ where: { code: productid } });
    if (!product) return res.status(404).json({ error: "Product not found." });

    const user = await prisma.user.findUnique({ where: { email: req.user.email } });
    if (!user) return res.status(404).json({ error: "User not found." });

    const cart = await prisma.cart.findUnique({ where: { userid: user.id } });
    if (!cart) return res.status(404).json({ error: "There is no cart for this user." });

    const userItemCart = await prisma.itemcart.findFirst({
      where: { userid: user.id, productid: product.id },
    });

    if (!userItemCart) return res.status(404).json({ error: "Item is not in the cart." });

    if(quantity > userItemCart.quantity) return res.status(400).json({ error: "Item quantity is more than available." });

    if (userItemCart.quantity === 1 || userItemCart.quantity === quantity) {
      await prisma.itemcart.delete({ where: { id: userItemCart.id } });
    } else {
      await prisma.itemcart.update({
        where: { id: userItemCart.id },
        data: {
          quantity: (userItemCart.quantity) - (quantity),
          itemsprice: product.price * (userItemCart.quantity - 1),
        },
      });
    }

    const totalPayPrice = await prisma.itemcart.aggregate({
      _sum: { itemsprice: true },
      where: { userid: user.id },
    });

    const updatedCart = await prisma.cart.update({
      where: { userid: user.id },
      data: {
        payprice: totalPayPrice._sum.itemsprice || 0,
        updated_at: new Date().toISOString(),
      },
      include: { itemcart: true },
    });

    await prisma.product.update({
      where: { code: productid },
      data: {
        quantity: (product.quantity) + (quantity),
      },
    });

    return res.status(200).json(updatedCart);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};