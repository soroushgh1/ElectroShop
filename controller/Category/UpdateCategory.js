import slugify from "slugify";
import prisma from "../../prismaclient.js";

export const UpdateCategory = async (req, res) => {

    try {
        
        const categoryid = req.params.id;
        if(!categoryid) return res.status(400).json({ error: "Category id is not in URL." });

        const findCategory = await prisma.category.findUnique({ where: { slug: categoryid }});
        if(!findCategory) return res.status(404).json({ error: "Category not found." });

        const { name } = req.body;
        if(!name) return res.status(400).json({ error: "Requested data can not be empty." });

        const now = new Date();

        let categorySlug = slugify(name, { strict: true, lower: true });
        let count = 0;

        let slug = `${categorySlug}-${count}`;
        let isSlugExist = await prisma.category.findUnique({ where: { slug: slug } });

        while (isSlugExist) {
            count++;
            slug = `${categorySlug}-${count}`;
            isSlugExist = await prisma.category.findUnique({ where: { slug: slug } });
        }

        const updatedCategory = await prisma.category.update({ where: { slug: categoryid }, data: { name: name, slug: slug, updated_at: String(now) }, select: { name: true, slug: true, created_at: true, updated_at: true }});

        return res.status(200).json(updatedCategory);
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}