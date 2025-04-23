import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  rating,
  reviewCount,
  brand,
  badge,
}) => {
  return (
    <Link to={`/product/${id}`} className="block">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col transition-transform hover:shadow-lg">
        <div className="relative pt-2">
          {badge && (
            <span 
              className={`absolute top-2 left-2 z-10 text-white text-xs font-medium px-3 py-1 rounded ${
                badge.color === "hot" ? "bg-pink-500" : 
                badge.color === "sale" ? "bg-blue-400" : 
                badge.color === "new" ? "bg-green-500" : "bg-orange-400"
              }`}
            >
              {badge.text}
            </span>
          )}
          <div className="h-44 flex items-center justify-center p-4">
            <img
              src={image}
              alt={name}
              className="max-h-full object-contain"
            />
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="text-xs text-gray-500 mb-1">{category}</div>
          <h3 className="font-medium text-sm leading-tight mb-2">{name}</h3>
          
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < rating ? "#FFC107" : "none"}
                stroke={i < rating ? "#FFC107" : "#CBD5E0"}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
          </div>
          
          <div className="text-xs text-gray-500 mb-1">By {brand}</div>
          
          <div className="mt-auto flex items-center justify-between">
            <div>
              <span className="text-green-600 font-semibold">${price.toFixed(2)}</span>
              <span className="text-xs text-gray-500 line-through ml-2">${originalPrice.toFixed(2)}</span>
            </div>
            
            <button className="bg-red-500 text-white px-3 py-1 rounded text-xs">
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;