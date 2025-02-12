import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    HomeIcon,
    ShoppingCartIcon,
    UsersIcon,
    ChartBarIcon,
    DocumentTextIcon,
    TruckIcon,
    Cog6ToothIcon,
    UserGroupIcon,
    TagIcon,
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { getUserRole, ROLES } from '../../utils/auth';

import { useFetchMenuItemQuery } from '../../features/menu/menuApi';


// const menuItems = [
//     {
//         name: 'Dashboard',
//         icon: HomeIcon,
//         path: '/',
//         roles: [ROLES.SUPER_ADMIN, ROLES.PRODUCT_ADMIN, ROLES.SELLER]
//     },
//     {
//         name: 'Analytics',
//         icon: ChartBarIcon,
//         path: '/analytics',
//         roles: [ROLES.SUPER_ADMIN]
//     },
//     {
//         name: 'Products',
//         icon: TagIcon,
//         roles: [ROLES.SUPER_ADMIN, ROLES.PRODUCT_ADMIN, ROLES.SELLER],
//         submenu: [
//             { name: 'All Products', path: '/products' },
//             { name: 'Add Product', path: '/products/add' },
//             { name: 'Categories', path: '/products/categories' },
//             { name: 'Inventory', path: '/products/inventory' }
//         ]
//     },
//     {
//         name: 'Orders',
//         icon: ShoppingCartIcon,
//         roles: [ROLES.SUPER_ADMIN, ROLES.SELLER],
//         submenu: [
//             { name: 'All Orders', path: '/orders' },
//             { name: 'Pending', path: '/orders/pending' },
//             { name: 'Shipped', path: '/orders/shipped' },
//             { name: 'Returns', path: '/orders/returns' }
//         ]
//     },
//     {
//         name: 'Customers',
//         icon: UsersIcon,
//         path: '/customers',
//         roles: [ROLES.SUPER_ADMIN, ROLES.SELLER]
//     },
//     {
//         name: 'User Management',
//         icon: UserGroupIcon,
//         roles: [ROLES.SUPER_ADMIN],
//         submenu: [
//             { name: 'All Users', path: '/users' },
//             { name: 'Roles', path: '/users/roles' },
//             { name: 'Permissions', path: '/users/permissions' }
//         ]
//     },
//     {
//         name: 'Settings',
//         icon: Cog6ToothIcon,
//         roles: [ROLES.SUPER_ADMIN],
//         submenu: [
//             { name: 'General', path: '/settings' },
//             { name: 'Security', path: '/settings/security' },
//             { name: 'Notifications', path: '/settings/notifications' }
//         ]
//     }
// ];

// Map icon names (from API) to actual components
const ICONS_MAP = {
    HomeIcon: HomeIcon,
    ShoppingCartIcon: ShoppingCartIcon,
    UsersIcon: UsersIcon,
    ChartBarIcon: ChartBarIcon,
    DocumentTextIcon: DocumentTextIcon,
    TruckIcon: TruckIcon,
    Cog6ToothIcon: Cog6ToothIcon,
    UserGroupIcon: UserGroupIcon,
    TagIcon: TagIcon
};

const MenuItem = ({ item, isCollapsed, toggleSidebar }) => {
    const [isOpen, setIsOpen] = useState(false);

     // Convert icon string to actual component
     const IconComponent = ICONS_MAP[item.icon] || HomeIcon; // Default to HomeIcon if not found

    if (item.submenu) {
        return (
            <div className="mb-2">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between p-3 rounded-lg text-gray-300 hover:bg-gray-700"
                >
                    <div className="flex items-center">
                        <IconComponent className="h-5 w-5 mr-3" />
                        {!isCollapsed && <span>{item.name}</span>}
                    </div>
                    {!isCollapsed && (
                        <ChevronDownIcon
                            className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                    )}
                </button>
                {isOpen && !isCollapsed && (
                    <div className="ml-6 mt-2 space-y-2">
                        {item.submenu.map((subItem) => (
                            <NavLink
                                key={subItem.path}
                                to={subItem.path}
                                onClick={() => window.innerWidth < 768 && toggleSidebar()}
                                className={({ isActive }) =>
                                    `block p-2 rounded-lg transition-colors ${isActive
                                        ? 'bg-primary text-white'
                                        : 'text-gray-300 hover:bg-gray-700'
                                    }`
                                }
                            >
                                {subItem.name}
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <NavLink
            to={item.path}
            onClick={() => window.innerWidth < 768 && toggleSidebar()}
            className={({ isActive }) =>
                `flex items-center p-3 mb-2 rounded-lg transition-colors ${isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`
            }
        >
            <IconComponent className="h-5 w-5 mr-3" />
            {!isCollapsed && <span>{item.name}</span>}
        </NavLink>
    );
}

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const userRole = getUserRole();
    const { data: menuItems, error, isLoading } = useFetchMenuItemQuery();


    const toggleSidebar = () => {
        if (window.innerWidth >= 768) {
            setIsCollapsed(!isCollapsed);
        } else {
            setIsMobileOpen(!isMobileOpen);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching menu: {error.message}</p>;
    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-lg bg-gray-800 text-white"
            >
                <Bars3Icon className="h-6 w-6" />
            </button>

            {/* Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed bg-black top-0 left-0 h-screen bg-sidebar text-white z-40 transition-all duration-300 
          ${isCollapsed ? 'w-20' : 'w-64'} 
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0`}
            >
                <div className="p-4">
                    <div className="flex items-center justify-between mb-8">
                        {!isCollapsed && <h1 className="text-xl font-bold">Admin Dashboard</h1>}
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg hover:bg-gray-700"
                        >
                            {isMobileOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {!isCollapsed && (
                        <div className="mb-8">
                            <p className="text-sm text-gray-400">Logged in as:</p>
                            <p className="text-sm font-semibold">{userRole}</p>
                        </div>
                    )}

                    <nav>
                        {menuItems?.data?.menuItems?.map((item, index) => (
                            <MenuItem
                                key={index}
                                item={item}
                                isCollapsed={isCollapsed}
                                toggleSidebar={toggleSidebar}
                            />
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Sidebar;