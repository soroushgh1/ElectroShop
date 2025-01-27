/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: This endpoint allows you to create a new product in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *               description:
 *                 type: string
 *                 description: A detailed description of the product.
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *               quantity:
 *                 type: number
 *                 description: The available quantity of the product.
 *               picture:
 *                 type: string
 *                 description: The URL of the product's picture.
 *               category_name:
 *                 type: string
 *                 description: The name of the category to which the product belongs.
 *     responses:
 *       201:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 code:
 *                   type: string
 *                 picture:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                 category:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request. All fields are required or the format of requested data is wrong.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve all products
 *     description: This endpoint returns a list of all products in the database.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   picture:
 *                     type: string
 *                   quantity:
 *                     type: number
 *                   code:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                   category:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       slug:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Bad request. An error occurred while retrieving products.
 */


/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a single product
 *     description: This endpoint returns a specific product by its ID (code).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID (code) of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 picture:
 *                   type: string
 *                 price:
 *                   type: number
 *                 quantity:
 *                   type: number
 *                 code:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                 category:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request. Product ID is not in the URL or an error occurred.
 *       404:
 *         description: Product not found.
 */


/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: This endpoint allows you to delete a specific product by its ID (code).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID (code) of the product to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       400:
 *         description: Bad request. Product ID is not in the URL or an error occurred.
 *       404:
 *         description: Product not found.
 */


/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     description: This endpoint allows you to update a specific product by its ID (code).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID (code) of the product to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the product.
 *               description:
 *                 type: string
 *                 description: The new description of the product.
 *               picture:
 *                 type: string
 *                 description: The new URL of the product's picture.
 *               price:
 *                 type: number
 *                 description: The new price of the product.
 *               quantity:
 *                 type: number
 *                 description: The new available quantity of the product.
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 picture:
 *                   type: string
 *                 price:
 *                   type: number
 *                 quantity:
 *                   type: number
 *                 code:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request. Product ID is not in the URL or an error occurred.
 *       404:
 *         description: Product not found.
 */


/**
 * @swagger
 * /api/products/search/{id}:
 *   get:
 *     summary: Search for products
 *     description: This endpoint allows you to search for products by name using a query string.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The search query to find products by name.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of products matching the search query.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                       description:
 *                         type: string
 *                       picture:
 *                         type: string
 *                       quantity:
 *                         type: number
 *                       code:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                 count:
 *                   type: number
 *       400:
 *         description: Bad request. Invalid or empty search query, or the query is too long.
 *       404:
 *         description: No products found matching the search query.
 *       500:
 *         description: Internal server error. An error occurred while searching for products.
 */


/**
 * @swagger
 * /api/products/{id}/category:
 *   put:
 *     summary: Change the category of a product
 *     description: This endpoint allows you to change the category of a specific product by its ID (code).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID (code) of the product whose category is to be changed.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *                 description: The name of the new category to assign to the product.
 *     responses:
 *       200:
 *         description: Product category updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 description:
 *                   type: string
 *                 picture:
 *                   type: string
 *                 code:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                 category:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request. Product ID is not in the URL or requested data is empty.
 *       404:
 *         description: Product not found or category not found.
 */
