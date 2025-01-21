import prisma from "../../prismaclient.js";

export const AddToCart = async (req, res) => {
  try {

    const { quantity } = req.body;
    if (!quantity || typeof (quantity) !== "number") return res.status(400).json({ error: "Requested data is invalid or not specfied." });

    const productid = req.params.id;
    if (!productid) return res.status(400).json({ error: "Product id is not in URL." });

    const product = await prisma.product.findUnique({ where: { code: productid } });
    if (!product) return res.status(404).json({ error: "Product not found." });

    const user = await prisma.user.findUnique({ where: { email: req.user.email } });
    if (!user) return res.status(404).json({ error: "User not found." });

    const checkCart = await prisma.cart.findUnique({ where: { userid: user.id } });

    const now = new Date();
    if (!checkCart) {

      const newItem = await prisma.itemcart.create({
        data: {
          productid: product.id,
          quantity: quantity,
          itemsprice: quantity * product.price,
          userid: user.id,
          created_at: String(now),
          updated_at: String(now)
        }
      })

      const totalPayPrice = await prisma.itemcart.aggregate({
        _sum: { itemsprice: true },
        where: { userid: user.id },
      });

      const cart = await prisma.cart.create({
        data: {
          userid: user.id,
          itemcart: { connect: { id: newItem.id } },
          payprice: totalPayPrice._sum.itemsprice,
          created_at: String(now),
          updated_at: String(now)
        }, include: { itemcart: true }
      })

      return res.status(201).json(cart);
    } else {

      const cart = await prisma.cart.findUnique({ where: { userid: user.id }, include: { itemcart: true } });

      const isSameItem = cart?.itemcart?.find((item) => item.productid == product.id);

      if (isSameItem) {

        const sameItem = await prisma.itemcart.update({
          where: { id: isSameItem.id },
          data: {
            quantity: quantity + (isSameItem.quantity),
            created_at: String(now),
            itemsprice: product.price * (quantity + (isSameItem.quantity)),
            updated_at: String(now)
          }
        });

        const totalPayPrice = await prisma.itemcart.aggregate({
          _sum: { itemsprice: true },
          where: { userid: user.id },
        });

        const updatedCart = await prisma.cart.update({
          where: { userid: user.id },
          data: {
            payprice: totalPayPrice._sum.itemsprice,
            updated_at: String(now)
          }, include: { itemcart: true }
        });

        return res.status(200).json(updatedCart);
      } else {

        const item = await prisma.itemcart.create({
          data: {
            productid: product.id,
            quantity: quantity,
            itemsprice: quantity * product.price,
            userid: user.id,
            created_at: String(now),
            updated_at: String(now)
          }
        });

        const updateCart = await prisma.cart.update({
          where: { userid: user.id },
          data: {
            payprice: checkCart.payprice + (item.itemsprice),
            itemcart: { connect: { id: item.id } },
            updated_at: String(now)
          }, include: { itemcart: true }
        });

        return res.status(200).json(updateCart);

      }

    }

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}