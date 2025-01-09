import prisma from "../../prismaclient.js";

export const GetAllCategories = async (req, res) => {
    try {
        
        const categories = await prisma.category.findMany({ select: { name: true, slug: true }});

        return res.status(200).json(categories);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export const GetOneCategories = async (req, res) => {
    try {
        
        const categorieid = req.params.id;

        if(!categorieid) return res.status(400).json({ error: "Category ID is not in URL." });

        const category = await prisma.category.findUnique({ where: { slug: categorieid }, select: { name: true, slug: true }});

        if(!category) return res.status(404).json({ error: "Category not found." });


        return res.status(200).json(category);
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}