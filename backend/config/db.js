import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose'
import User from '../models/user.model.js';
import Role from '../models/role.model.js';
import UserRole from '../models/user.role.model.js';
import ProductCategory from '../models/product/product_category.model.js';
import ProductSubCategory from '../models/product/product_subcategory.model.js';
import Product from '../models/product/product.model.js';
import ProductPricing from '../models/product/product_pricing.model.js';
import ProductAttributes from '../models/product/product_attributes.model.js';
import ProductSEO from '../models/product/product_seo.model.js';
import Image from '../models/image.model.js';

// creating the first admin user
const createFirstAdminUser = asyncHandler(async () => {
    // check the admin exists or not
    // User.collection.dropIndex('phone_1');
    console.log("It is coming under createFirst User");
    let existingSuperAdmin = await User.findOne({ name: 'Super Admin' });
    let existingRole = await Role.findOne({ name: 'SUPER ADMIN' });
    // This creates the super admin role first
    // if doesn't exists
    if (!existingRole) {
        // basic details of super admin
        const role = {
            name: 'SUPER ADMIN',
            description: 'Super Admin Role has access to everythings.',
            createdBy: 'Woocommerce Super Admin'
        }
        existingRole = await Role.create(role);
        console.log('Super admin created successfully!');
    }
    else {
        console.log("Super admin Role already exist.")
        console.log("Role details:", existingRole.id);
    };
    if (!existingSuperAdmin) {
        const firstAdmin = {
            name: 'Woocommerce Super Admin',
            email: 'superadmin@woocommerce.com',
            mobile: "9003004565",
            isVerified: true,
            password: '852963', // Hashing the password
        }
        existingSuperAdmin = await User.create(firstAdmin)
        console.log('First super admin created successfully!');

        // inserting this details into userrole model
        const userRoleDetails = {
            userId: existingSuperAdmin.id,
            roleId: existingRole.id,
            entityId: existingSuperAdmin.id,
            entityType: 'SUPER ADMIN',
            status: "approved"
        }
        const firstUserRole = await UserRole.create(userRoleDetails)
        console.log("First user role created successfully", firstUserRole);
    }
    else console.log("Admin already exists");
})


// Generate random data
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const resetAndInsertData = asyncHandler(async () => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        console.log("Starting cleanup...");

        // Delete all existing data
        await ProductCategory.deleteMany({}, { session });
        await ProductSubCategory.deleteMany({}, { session });
        await Product.deleteMany({}, { session });
        await ProductPricing.deleteMany({}, { session });
        await ProductAttributes.deleteMany({}, { session });
        await ProductSEO.deleteMany({}, { session });
        await Image.deleteMany({}, { session });

        console.log("All existing data deleted successfully.");

        // Define new categories and subcategories
        const categories = [
            { name: "Fruits", description: "Fresh and delicious fruits" },
            { name: "Electronics", description: "Latest gadgets and devices" },
            { name: "Clothing", description: "Trendy and comfortable clothing" },
            { name: "Books", description: "Wide range of books and novels" },
            { name: "Furniture", description: "Stylish and durable furniture" },
        ];

        const subcategories = {
            Fruits: ["Apple", "Banana", "Orange", "Grapes", "Mango"],
            Electronics: ["Laptops", "Mobile Phones", "Tablets", "Cameras", "Headphones"],
            Clothing: ["Men's Wear", "Women's Wear", "Kids' Wear", "Sportswear", "Accessories"],
            Books: ["Fiction", "Non-Fiction", "Comics", "Educational", "Biographies"],
            Furniture: ["Chairs", "Tables", "Beds", "Sofas", "Cabinets"],
        };

        // Insert categories and subcategories
        const categoryDocs = [];
        for (const category of categories) {
            const categoryDoc = await ProductCategory.create([category], { session });
            categoryDocs.push(categoryDoc[0]);

            for (const subcategoryName of subcategories[category.name]) {
                await ProductSubCategory.create(
                    [
                        {
                            name: subcategoryName,
                            description: `All about ${subcategoryName}`,
                            category: categoryDoc[0]._id,
                        },
                    ],
                    { session }
                );
            }
        }

        console.log("Categories and Subcategories inserted successfully.");

        // Insert products
        for (let i = 0; i < 100; i++) {
            const randomCategory = getRandomElement(categoryDocs);
            const subcategoriesForCategory = await ProductSubCategory.find(
                { category: randomCategory._id },
                null,
                { session }
            );
            const randomSubCategory = getRandomElement(subcategoriesForCategory);

            // Create product
            const product = await Product.create(
                [
                    {
                        name: `Product ${i + 1} - ${new mongoose.Types.ObjectId()}`, // Ensure unique name
                        description: `Description for Product ${i + 1}`,
                        subCategory: randomSubCategory._id,
                        views: Math.floor(Math.random() * 1000),
                        sales: Math.floor(Math.random() * 500),
                        rating: Math.random() * 5,
                        discount: Math.random() * 50,
                        isActive: true,
                    },
                ],
                { session }
            );

            // Add pricing
            const pricing = await ProductPricing.create(
                [
                    {
                        product: product[0]._id,
                        price: Math.random() * 1000,
                        mrp: Math.random() * 1200,
                        discount: Math.random() * 30,
                        finalPrice: Math.random() * 800,
                    },
                ],
                { session }
            );
            product[0].pricing = pricing[0]._id;

            // Add attributes
            const attributes = await ProductAttributes.create(
                [
                    {
                        product: product[0]._id,
                        color: getRandomElement(["Red", "Blue", "Green", "Black", "White"]),
                        material: getRandomElement(["Cotton", "Plastic", "Metal", "Granite", "Wood"]),
                        weight: Math.random() * 100,
                        packagingType: getRandomElement(["Box", "Carton", "Packet", "Pouch", "Other"]),
                        unit: getRandomElement(["g", "kg", "ml", "l", "pcs"]),
                    },
                ],
                { session }
            );
            product[0].attributes = attributes[0]._id;

            // Add SEO
            const seo = await ProductSEO.create(
                [
                    {
                        product: product[0]._id,
                        keywords: `Product ${i + 1}, ${randomSubCategory.name}`,
                        slug: `product-${i + 1}-${randomSubCategory.name.toLowerCase()}`,
                    },
                ],
                { session }
            );
            product[0].seo = seo[0]._id;

            // Add images
            const images = [];
            for (let j = 0; j < 3; j++) {
                const image = await Image.create(
                    [
                        {
                            entityType: "PRODUCT",
                            entityId: product[0]._id,
                            imageType: "GALLERY",
                            publicId: `product_${i + 1}_image_${j + 1}`,
                            fileType: "jpg",
                        },
                    ],
                    { session }
                );
                images.push(image[0]._id);
            }
            product[0].images = images;

            // Add thumbnail
            const thumbnail = await Image.create(
                [
                    {
                        entityType: "PRODUCT",
                        entityId: product[0]._id,
                        imageType: "THUMBNAIL",
                        publicId: `product_${i + 1}_thumbnail`,
                        fileType: "jpg",
                    },
                ],
                { session }
            );
            product[0].thumbnail = thumbnail[0]._id;

            // Save product
            await product[0].save({ session });
        }

        console.log("Products inserted successfully.");

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
        console.log("Transaction committed successfully.");
    } catch (error) {
        // Rollback the transaction in case of an error
        await session.abortTransaction();
        session.endSession();
        console.error("Transaction aborted due to an error:", error);
        throw error;
    }
});


// This is database connection
const connectDB = asyncHandler(async () => {
    console.log("Mongo URI", process.env.MONGO_URL);
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await createFirstAdminUser()
    // await resetAndInsertData()
})

export default connectDB