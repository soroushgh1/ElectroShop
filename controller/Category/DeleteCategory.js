import prisma from "../../prismaclient.js";


export const DeleteCategories = async (req, res) => {
    try {

        if(!req.user.isadmin){
            return res.status(403).json({ error: "Access denied." });
        }
        
        const categorieid = req.params.id;

        if(!categorieid) return res.status(400).json({ error: "Category ID is not in URL." });

        const category = await prisma.category.findUnique({ where: { slug: categorieid }, select: { name: true, slug: true }});

        if(!category) return res.status(404).json({ error: "Category not found." });

        await prisma.category.delete({ where: { slug: categorieid }});

        return res.status(200).json({ message: "Category deleted successfully." });
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}