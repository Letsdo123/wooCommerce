import { useState } from 'react';
import DataGrid from '../../components/dashboard/DataGrid';
import { TagIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// This is the static data for the approval table
const mockProducts = [
  { id: 1, name: 'Product A', category: 'Electronics', price: 299.99, stock: 50, status: 'Active' },
  { id: 2, name: 'Product B', category: 'Clothing', price: 49.99, stock: 100, status: 'Active' },
  { id: 3, name: 'Product C', category: 'Food', price: 9.99, stock: 200, status: 'Inactive' },
  { id: 4, name: 'Product D', category: 'Electronics', price: 599.99, stock: 30, status: 'Active' },
];

const UserApproval=()=> {
  const [products] = useState(mockProducts);

  const columns = [
    { key: 'name', label: 'Product Name' },
    { key: 'category', label: 'Category' },
    {
      key: 'price',
      label: 'Price',
      render: (value) => `$${value.toFixed(2)}`
    },
    { key: 'stock', label: 'Stock' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, item) => (
        <div className="flex space-x-2">
          <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
            <PencilIcon className="h-5 w-5" />
          </button>
          <button className="p-1 text-red-600 hover:bg-red-100 rounded">
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary/90">
          <TagIcon className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Total Products</h3>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Active Products</h3>
          <p className="text-2xl font-bold">
            {products.filter(p => p.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Low Stock</h3>
          <p className="text-2xl font-bold">
            {products.filter(p => p.stock < 50).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Categories</h3>
          <p className="text-2xl font-bold">
            {new Set(products.map(p => p.category)).size}
          </p>
        </div>
      </div>

      <DataGrid columns={columns} data={products} />
    </div>
  );
}

export default UserApproval;