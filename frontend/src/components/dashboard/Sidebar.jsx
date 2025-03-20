import { useState } from 'react';
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
import { useFetchMenuItemQuery } from '../../features/menu/menuApi';

const ICONS_MAP = {
    HomeIcon,
    ShoppingCartIcon,
    UsersIcon,
    ChartBarIcon,
    DocumentTextIcon,
    TruckIcon,
    Cog6ToothIcon,
    UserGroupIcon,
    TagIcon
};

const MenuItem = ({ item, isCollapsed, toggleSidebar, level = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const IconComponent = ICONS_MAP[item.icon] || HomeIcon; // Default to HomeIcon

    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <div className={`mb-1 ${level > 0 ? 'ml-4' : ''}`}> {/* Indent submenus */}
            {/* Parent Menu Item */}
            <button
                onClick={handleToggle}
                className="w-full flex items-center justify-between p-3 rounded-lg text-gray-300 hover:bg-gray-700"
            >
                <div className="flex items-center">
                    <IconComponent className="h-5 w-5 mr-3" />
                    {!isCollapsed && <span>{item.name}</span>}
                </div>
                {!isCollapsed && item.submenu && (
                    <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                )}
            </button>

            {/* Nested Submenu Items */}
            {isOpen && item.submenu && !isCollapsed && (
                <div className="ml-6 border-l border-gray-600 pl-2 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                        subItem.submenu ? (
                            <MenuItem
                                key={subItem.path}
                                item={subItem}
                                isCollapsed={isCollapsed}
                                toggleSidebar={toggleSidebar}
                                level={level + 1} // Increase level for deeper indentation
                            />
                        ) : (
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
                        )
                    ))}
                </div>
            )}
        </div>
    );
};



function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const userRole = ["SUPER ADMIN","SELLER"];
    const { data: menuItems, error, isLoading } = useFetchMenuItemQuery(userRole, {
        skip: !userRole,
    });

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
            <button
                onClick={toggleSidebar}
                className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-lg bg-gray-800 text-white"
            >
                <Bars3Icon className="h-6 w-6" />
            </button>

            {isMobileOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleSidebar} />
            )}

            <div
                className={`fixed bg-black top-0 left-0 h-screen bg-sidebar text-white z-40 transition-all duration-300 
          ${isCollapsed ? 'w-20' : 'w-64'} 
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0`}
            >
                <div className="p-4">
                    <div className="flex items-center justify-between mb-8">
                        {!isCollapsed && <h1 className="text-xl font-bold">Admin Dashboard</h1>}
                        <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-700">
                            {isMobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
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
