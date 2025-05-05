import React from 'react';
import CategoryCard from './CategoryCard';


// Sample category data - export to share with SubcategoryGrid
export const categories = [
  {
    id: 1,
    name: 'Fresh Vegetables',
    slug: 'fresh-vegetables',
    image: 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg',
    discount: 20,
    itemCount: 156,
    subcategories: [
      {
        name: 'Organic Vegetables',
        slug: 'organic-vegetables',
        image: 'https://images.pexels.com/photos/2751755/pexels-photo-2751755.jpeg'
      },
      {
        name: 'Leafy Greens',
        slug: 'leafy-greens',
        image: 'https://images.pexels.com/photos/1751149/pexels-photo-1751149.jpeg'
      },
      {
        name: 'Root Vegetables',
        slug: 'root-vegetables',
        image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg'
      }
    ]
  },
  {
    id: 2,
    name: 'Fresh Fruits',
    slug: 'fresh-fruits',
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg',
    discount: 15,
    itemCount: 124,
    subcategories: [
      {
        name: 'Seasonal Fruits',
        slug: 'seasonal-fruits',
        image: 'https://images.pexels.com/photos/1132040/pexels-photo-1132040.jpeg'
      },
      {
        name: 'Exotic Fruits',
        slug: 'exotic-fruits',
        image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg'
      },
      {
        name: 'Citrus Fruits',
        slug: 'citrus-fruits',
        image: 'https://images.pexels.com/photos/952360/pexels-photo-952360.jpeg'
      }
    ]
  },
  {
    id: 3,
    name: 'Dairy & Eggs',
    slug: 'dairy-eggs',
    image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg',
    discount: 10,
    itemCount: 98,
    subcategories: [
      {
        name: 'Milk & Cream',
        slug: 'milk-cream',
        image: 'https://images.pexels.com/photos/248337/pexels-photo-248337.jpeg'
      },
      {
        name: 'Cheese',
        slug: 'cheese',
        image: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg'
      },
      {
        name: 'Eggs',
        slug: 'eggs',
        image: 'https://images.pexels.com/photos/162712/eggs-egg-carton-food-162712.jpeg'
      },
      {
        name: 'Milk & Cream',
        slug: 'milk-cream',
        image: 'https://images.pexels.com/photos/248337/pexels-photo-248337.jpeg'
      },
      {
        name: 'Cheese',
        slug: 'cheese',
        image: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg'
      },
      {
        name: 'Eggs',
        slug: 'eggs',
        image: 'https://images.pexels.com/photos/162712/eggs-egg-carton-food-162712.jpeg'
      }
    ]
  },
  {
    id: 4,
    name: 'Meat & Seafood',
    slug: 'meat-seafood',
    image: 'https://images.pexels.com/photos/1927377/pexels-photo-1927377.jpeg',
    discount: 25,
    itemCount: 112,
    subcategories: [
      {
        name: 'Chicken',
        slug: 'chicken',
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg'
      },
      {
        name: 'Fish',
        slug: 'fish',
        image: 'https://images.pexels.com/photos/2161935/pexels-photo-2161935.jpeg'
      },
      {
        name: 'Mutton',
        slug: 'mutton',
        image: 'https://images.pexels.com/photos/1927383/pexels-photo-1927383.jpeg'
      },
      {
        name: 'Chicken',
        slug: 'chicken',
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg'
      },
      {
        name: 'Fish',
        slug: 'fish',
        image: 'https://images.pexels.com/photos/2161935/pexels-photo-2161935.jpeg'
      },
      {
        name: 'Mutton',
        slug: 'mutton',
        image: 'https://images.pexels.com/photos/1927383/pexels-photo-1927383.jpeg'
      }
    ]
  },
  {
    id: 5,
    name: 'Bakery',
    slug: 'bakery',
    image: 'https://images.pexels.com/photos/1070946/pexels-photo-1070946.jpeg',
    discount: 30,
    itemCount: 86,
    subcategories: [
      {
        name: 'Bread',
        slug: 'bread',
        image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg'
      },
      {
        name: 'Cakes',
        slug: 'cakes',
        image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg'
      },
      {
        name: 'Cookies',
        slug: 'cookies',
        image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg'
      },
      {
        name: 'Bread',
        slug: 'bread',
        image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg'
      },
      {
        name: 'Cakes',
        slug: 'cakes',
        image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg'
      },
      {
        name: 'Cookies',
        slug: 'cookies',
        image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg'
      }
    ]
  },
  {
    id: 6,
    name: 'Beverages',
    slug: 'beverages',
    image: 'https://images.pexels.com/photos/1189261/pexels-photo-1189261.jpeg',
    discount: 20,
    itemCount: 134,
    subcategories: [
      {
        name: 'Coffee',
        slug: 'coffee',
        image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg'
      },
      {
        name: 'Tea',
        slug: 'tea',
        image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg'
      },
      {
        name: 'Juices',
        slug: 'juices',
        image: 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg'
      }
    ]
  }
];

function CategoryGrid() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop By Category</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default CategoryGrid;