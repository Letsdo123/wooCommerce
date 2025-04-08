import { useEffect, useState } from 'react';
import DataGrid from '../../components/dashboard/DataGrid';
import ProductSubCategoryForm from '../../components/dashboard/ProductSubCategoryForm';
import { ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { useGetCategoryDetailsQuery } from '../../features/product/categoryApi.js';
import { useSelector } from 'react-redux';
import { useGetSubCategoryDetailsQuery } from '../../features/product/subcategoryApi.js';

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

const ProductSubCategory = () => {
    const [roles, setRoles] = useState(mockRoles);
    const [permissions, setPermissions] = useState(mockPermissions);
    const [activeTab, setActiveTab] = useState('subcategories');
    const { data, error, isLoading, isSuccess } = useGetSubCategoryDetailsQuery();

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
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Product Sub Category Management</h1>
                <p className="text-gray-600">Manage product sub category</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="border-b px-4">
                            <div className="flex space-x-4">
                                <button
                                    className={`py-4 px-4 focus:outline-none ${activeTab === 'subcategories'
                                            ? 'border-b-2 border-primary text-primary'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    onClick={() => setActiveTab('subcategories')}
                                >
                                    <div className="flex items-center space-x-2">
                                        <UserGroupIcon className="h-5 w-5" />
                                        <span>Sub Category</span>
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

                    <DataGrid
                        columns={activeTab === 'subcategories' ? roleColumns : permissionColumns}
                        data={activeTab === 'subcategories' ? roles : permissions}
                    />
                </div>

                <div>
                    <ProductSubCategoryForm
                        type={activeTab === 'subcategories' ? 'subcategory' : 'permission'}
                        onSubmit={activeTab === 'subcategories' ? handleAddRole : handleAddPermission}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductSubCategory;