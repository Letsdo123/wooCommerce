import { useState } from 'react';
import DataGrid from '../../components/dashboard/DataGrid';
import RolePermissionForm from '../../components/dashboard/RolePermissionForm';
import { ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const mockRoles = [
    {
        id: 1,
        name: 'Super Admin',
        description: 'Full access to all features',
        createdAt: '2024-03-15'
    },
    {
        id: 2,
        name: 'Product Admin',
        description: 'Manage products and inventory',
        createdAt: '2024-03-15'
    },
    {
        id: 3,
        name: 'Seller',
        description: 'Manage orders and view products',
        createdAt: '2024-03-15'
    }
];

const Role = () => {
    const [roles, setRoles] = useState(mockRoles);
    const [activeTab, setActiveTab] = useState('roles');

    const handleAddRole = (roleData) => {
        setRoles(prev => [...prev, {
            id: prev.length + 1,
            ...roleData,
            createdAt: new Date().toISOString().split('T')[0]
        }]);
    };

    const roleColumns = [
        { key: 'name', label: 'Role Name' },
        { key: 'description', label: 'Description' },
        { key: 'createdAt', label: 'Created At' }
    ];

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Role & Permission Management</h1>
                <p className="text-gray-600">Manage user roles and permissions</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="border-b px-4">
                            <div className="flex space-x-4">
                                {/* This is the tab section where there are two buttons */}
                                <button
                                    className={`py-4 px-4 focus:outline-none ${activeTab === 'roles'
                                            ? 'border-b-2 border-primary text-primary'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    onClick={() => setActiveTab('roles')}
                                >
                                    <div className="flex items-center space-x-2">
                                        <UserGroupIcon className="h-5 w-5" />
                                        <span>Roles</span>
                                    </div>
                                </button>
                                <button
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
                                </button>
                            </div>
                        </div>
                    </div>

                    <DataGrid
                        columns={activeTab === 'roles' ? roleColumns : permissionColumns}
                        data={activeTab === 'roles' ? roles : permissions}
                    />
                </div>
                <div>
                    <RolePermissionForm
                        type={activeTab === 'roles' ? 'role' : 'permission'}
                        onSubmit={activeTab === 'roles' ? handleAddRole : handleAddPermission}
                    />
                </div>
            </div>
        </div>
    );
}

export default Role;