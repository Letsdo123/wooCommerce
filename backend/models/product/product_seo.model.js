
const ProductSEOSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        unique: true,
    },
    keywords: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    }
})

const ProductSEO = mongoose.model("ProductSEO", ProductSEOSchema);

export default ProductSEO;