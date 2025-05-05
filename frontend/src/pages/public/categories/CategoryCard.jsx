import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

function CategoryCard({ category }) {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        arrows: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1 }
            }
        ]
    };
    return (
        <Link
            to={`/category/${category.slug}`}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center"
        >
            <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                <img
                    loading='lazy'
                    width={300}
                    height={300}
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                />
                {category.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Up to {category.discount}% Off
                    </div>
                )}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">{category.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{category.itemCount} Items</p>
            <div className="grid grid-cols-3 gap-2 w-full">

                {category.subcategories.slice(0, 3).map((subcat, index) => (
                    <Link
                        key={index}
                        to={`/category/${category.slug}/${subcat.slug}`}
                        className="text-center"
                    >
                        <div className="aspect-square rounded-lg overflow-hidden mb-1">
                            <img
                                loading='lazy'
                                src={subcat.image}
                                width={100}
                                height={100}
                                alt={subcat.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="text-xs text-gray-600 truncate">{subcat.name}</p>
                    </Link>
                ))}
            </div>
        </Link>
    );
}

export default React.memo(CategoryCard);