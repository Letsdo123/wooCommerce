import Product from "../../models/product/product.model";

export const createProduct = asyncHandler(async (req, res) => {
    const { name, description, image, price, quantity, isActive, category, subcategory } = req.body;
    const product = await Product.create({
        name,
        description,
        image,
        price,
        quantity,
        isActive,
        category,
        subcategory
    });
    if (!product) {
        return ResponseHandler.error(res, null, "Product Not Created", 400);
    }

    return ResponseHandler.success(res, product, "Product Created ", 200);
});

