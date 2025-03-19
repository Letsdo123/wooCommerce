

const ProductAttributesSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    weight: {
        type: Number,
    },
    unit: {
        type: String,
        enum: ["g", "kg", "ml", "l", "pcs"],
        required: true,
    },
    packagingType: {
        type: String,
        required: true,
        enum: ["Box", "Carton", "Packet", "Pouch", "Other"],
    },
    expiryDate: {
        type: Date,
    },
    dimensions: {
        length: {
            type: Number,
        },
        width: {
            type: Number,
        },
        height: {
            type: Number,
        },
        unit: {
            type: String,
            enum: ["cm", "m", "in", "ft"],
        },
    },
    color: {
        type: String,
    },
    material: {
        type: String,
    },
})

const ProductAttributes = mongoose.model("ProductAttributes", ProductAttributesSchema);
export default ProductAttributes;