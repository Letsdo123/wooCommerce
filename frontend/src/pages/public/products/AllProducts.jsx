import React, { useEffect, useState } from 'react'
import CategoryTabs from './CategoryTabs';
import ProductCard from './ProductCard';
import { useGetProductQuery } from '../../../features/product/productApi';

function AllProducts() {
  const { data: filterData = [], isLoading, isError, isSuccess } = useGetProductQuery();
  useEffect(() => {
    if (isSuccess) {
      console.log("API Response:", filterData);
    }
    if (isError) {
      console.error("Error fetching products");
    }
  }, [isSuccess, isError, filterData]);
  const products = [
    {
      id: 1,
      name: "Fresh organic villa farm lemon 500gm pack",
      price: 28.85,
      originalPrice: 32.8,
      image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Lemon.jpg",
      category: "Fresh",
      rating: 5,
      reviewCount: 4.6,
      brand: "NestFood",
      badge: { text: "Hot", color: "hot" }
    },
    {
      id: 2,
      name: "Best snakes with hazel nut pack 200gm",
      price: 52.85,
      originalPrice: 55.8,
      image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Hazelnuts_in_shell_and_out.jpg",
      category: "Hodo Foods",
      rating: 5,
      reviewCount: 3.5,
      brand: "Stouffer",
      badge: { text: "Sale", color: "sale" }
    },
    {
      id: 3,
      name: "Organic fresh vanilla farm watermelon 5kg",
      price: 48.85,
      originalPrice: 52.8,
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Watermelon_cross_BNC.jpg",
      category: "Snack",
      rating: 5,
      reviewCount: 4.0,
      brand: "StarKist",
      badge: { text: "New", color: "new" }
    },
    {
      id: 4,
      name: "Fresh organic apple 1kg simla marming",
      price: 17.85,
      originalPrice: 19.8,
      image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg",
      category: "Vegetables",
      rating: 5,
      reviewCount: 4.0,
      brand: "NestFood"
    },
    {
      id: 5,
      name: "Blue Diamond Almonds Lightly Salted Vegetables",
      price: 23.85,
      originalPrice: 25.8,
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Blue_Diamond_almonds.jpg",
      category: "Pet Foods",
      rating: 5,
      reviewCount: 4.0,
      brand: "NestFood",
      badge: { text: "Less", color: "less" }
    },
    {
      id: 6,
      name: "Chobani Complete Vanilla Greek Yogurt",
      price: 54.85,
      originalPrice: 56.8,
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Chobani_Greek_Yogurt.jpg",
      category: "Hodo Foods",
      rating: 5,
      reviewCount: 4.0,
      brand: "NestFood",
      badge: { text: "Hot", color: "hot" }
    },
    {
      id: 7,
      name: "Canada Dry Ginger Ale – 2 L Bottle - 400g",
      price: 32.85,
      originalPrice: 33.8,
      image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Canada_Dry_Ginger_Ale.jpg",
      category: "Meats",
      rating: 5,
      reviewCount: 4.0,
      brand: "NestFood",
      badge: { text: "Sale", color: "sale" }
    },
    {
      id: 8,
      name: "Encore Seafoods Stuffed Alaskan Salmon",
      price: 35.85,
      originalPrice: 37.8,
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Salmon_dish.jpg",
      category: "Snack",
      rating: 5,
      reviewCount: 4.0,
      brand: "NestFood"
    },
    {
      id: 9,
      name: "Gorton's Beer Battered Fish Fillets with soft paper",
      price: 23.85,
      originalPrice: 25.8,
      image: "https://www.gortons.com/wp-content/uploads/2020/03/Beer-Battered-Fillets.png",
      category: "Coffes",
      rating: 5,
      reviewCount: 4.0,
      brand: "Old El Paso"
    },
    {
      id: 10,
      name: "Haagen-Dazs Caramel Cone Ice Cream Ketchup",
      price: 22.85,
      originalPrice: 24.8,
      image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Haagen-Dazs_caramel_cone.jpg",
      category: "Coffes",
      rating: 5,
      reviewCount: 4.0,
      brand: "Tyson"
    }
  ];
  const [activeCategory, setActiveCategory] = useState("All")
  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter(product => {
      if (activeCategory === "Milks & Dairies") return product.category === "Hodo Foods";
      if (activeCategory === "Coffes & Teas") return product.category === "Coffes";
      if (activeCategory === "Pet Foods") return product.category === "Pet Foods";
      if (activeCategory === "Meats") return product.category === "Meats";
      if (activeCategory === "Vegetables") return product.category === "Vegetables";
      if (activeCategory === "Fruits") return product.category === "Fresh";
      return false;
    });


  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Something went wrong</p>
  if (isSuccess) console.log(filterData)
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Popular Products</h2>
      </div>

      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default AllProducts
