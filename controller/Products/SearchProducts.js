import prisma from "../../prismaclient.js";

export const SearchProducts = async (req, res) => {
    try {
        const query = req.query.q;

        if (!query || typeof query !== "string" || !query.trim()) {
            return res.status(400).json({ error: "Invalid or empty search query." });
        }

        if (query.length > 50) {
            return res.status(400).json({ error: "Search query is too long." });
        }

        const searchResults = await prisma.product.findMany({
            where: {
                name: {
                    contains: query,
                    mode: "insensitive"
                }
            }
        });

        if (searchResults.length === 0) {
            return res.status(404).json({ error: "No products found matching the search query." });
        }

        return res.status(200).json({ data: searchResults });
    } catch (err) {
        return res.status(500).json({ error: "An error occurred while searching for products." });
    }
};