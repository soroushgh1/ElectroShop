import slugify from "slugify";
import prisma from "../../prismaclient.js";

export const CreateCategory = async (req, res) => {

    try {
        
        const { name } = req.body;

        if (!name) return res.status(400).json({ error: "Requested data cannot be empty" });

        let slug = slugify(name, { strict: true, lower: true });
        let count = 0;

        const now = new Date();

        let categorySlug = slug;
        let isCategoryExist = await prisma.category.findUnique({ where: { slug: categorySlug } });

        while (isCategoryExist) {
            count++;
            categorySlug = `${slug}-${count}`;
            isCategoryExist = await prisma.category.findUnique({ where: { slug: categorySlug } });
        }

        const newCategory = await prisma.category.create({ data: { name: name, slug: categorySlug, created_at: now, updated_at: now } });

        return res.status(201).json(newCategory);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}