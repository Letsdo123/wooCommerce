import { useEffect, useState } from 'react';
import DataGrid from '../../components/dashboard/DataGrid';
import ProductCategoryForm from '../../components/dashboard/ProductCategoryForm';
import { ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { useGetCategoryDetailsQuery } from '../../features/product/categoryApi.js';

const mockRoles = [
    {
        id: 1,
        name: 'Super Admin',
        description: 'Full access to all features',
        permissions: ['manage_users', 'manage_products', 'manage_orders', 'view_analytics', 'manage_settings'],
        createdAt: '2024-03-15'
    },
    {
        id: 2,
        name: 'Product Admin',
        description: 'Manage products and inventory',
        permissions: ['manage_products'],
        createdAt: '2024-03-15'
    },
    {
        id: 3,
        name: 'Seller',
        description: 'Manage orders and view products',
        permissions: ['manage_orders', 'view_products'],
        createdAt: '2024-03-15'
    }
];

const mockPermissions = [
    {
        id: 1,
        name: 'manage_users',
        description: 'Create, update, and delete users',
        createdAt: '2024-03-15'
    },
    {
        id: 2,
        name: 'manage_products',
        description: 'Manage product inventory',
        createdAt: '2024-03-15'
    },
    {
        id: 3,
        name: 'manage_orders',
        description: 'Process and manage orders',
        createdAt: '2024-03-15'
    }
];

const ProductCategory = () => {
    const [roles, setRoles] = useState(mockRoles);
    const [permissions, setPermissions] = useState(mockPermissions);
    const [activeTab, setActiveTab] = useState('categories');
    const { data, error, isLoading, isSuccess } = useGetCategoryDetailsQuery();

    useEffect(() => {
        console.log(data);
        console.log(isSuccess);

    }, [data]);

    const handleAddRole = (roleData) => {
        setRoles(prev => [...prev, {
            id: prev.length + 1,
            ...roleData,
            createdAt: new Date().toISOString().split('T')[0]
        }]);
    };

    const handleAddPermission = (permissionData) => {
        setPermissions(prev => [...prev, {
            id: prev.length + 1,
            ...permissionData,
            createdAt: new Date().toISOString().split('T')[0]
        }]);
    };

    const roleColumns = [
        { key: 'name', label: 'Role Name' },
        { key: 'description', label: 'Description' },
        {
            key: 'permissions',
            label: 'Permissions',
            render: (permissions) => (
                <div className="flex flex-wrap gap-1">
                    {permissions.map((permission) => (
                        <span
                            key={permission}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                            {permission}
                        </span>
                    ))}
                </div>
            )
        },
        { key: 'createdAt', label: 'Created At' }
    ];

    const permissionColumns = [
        { key: 'name', label: 'Permission Name' },
        { key: 'description', label: 'Description' },
        { key: 'createdAt', label: 'Created At' }
    ];

    return (
        <div className="p-6">
            {/* This is header part */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Product Category Management</h1>
                <p className="text-gray-600">Manage product category</p>
            </div>
            {/* This is the tab part */}
            <div className="">
                <div className="lg:col-span-2 tab-header">
                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="border-b px-4">
                            {/* tab button container */}
                            <div className="flex space-x-4">
                                <button
                                    className={`py-4 px-4 focus:outline-none ${activeTab === 'categories'
                                        ? 'border-b-2 border-primary text-primary'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    onClick={() => setActiveTab('categories')}
                                >
                                    <div className="flex items-center space-x-2">
                                        <UserGroupIcon className="h-5 w-5" />
                                        <span>Category</span>
                                    </div>
                                </button>
                                {/* <button
                                    className={`py-4 px-4 focus:outline-none ${activeTab === 'permissions'
                                            ? 'border-b-2 border-primary text-primary'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    onClick={() => setActiveTab('permissions')}
                                >
                                    <div className="flex items-center space-x-2">
                                        <ShieldCheckIcon className="h-5 w-5" />
                                        <span>Permissions</span>
                                    </div>
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Product form  */}
                <div className='tab-pane'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <div className='data-grid-container'>
                            <DataGrid
                                columns={activeTab === 'categories' ? roleColumns : permissionColumns}
                                data={activeTab === 'categories' ? roles : permissions}
                            />
                        </div>
                        <div className='prodict-form-container'>
                            <ProductCategoryForm
                                type={activeTab === 'categories' ? 'category' : 'permission'}
                                onSubmit={activeTab === 'categories' ? handleAddRole : handleAddPermission}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCategory;