import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { 
  FiUser, FiSettings, FiHeart, FiShoppingCart, FiLogOut, 
  FiCreditCard, FiBell, FiShoppingBag, FiTruck, FiGrid,
  FiEdit, FiMapPin, FiDollarSign, FiBox
} from 'react-icons/fi';

function AccountDropdown({ userRoles = [], onViewProfile = () => {} }) {
  // Dashboard sections based on roles
  const getDashboardItems = () => {
    const items = [];
    
    if (userRoles.includes('superAdmin')) {
      items.push({
        icon: FiGrid,
        label: 'Admin Dashboard',
        href: '/admin/dashboard',
        submenu: [
          { label: 'Overview', href: '/admin/dashboard' },
          { label: 'Seller Approvals', href: '/admin/sellers' },
          { label: 'User Management', href: '/admin/users' },
          { label: 'System Settings', href: '/admin/settings' },
        ]
      });
    }

    if (userRoles.includes('seller')) {
      items.push({
        icon: FiShoppingBag,
        label: 'Seller Dashboard',
        href: '/seller/dashboard',
        submenu: [
          { label: 'Store Overview', href: '/seller/dashboard' },
          { label: 'Products', href: '/seller/products' },
          { label: 'Orders', href: '/seller/orders' },
          { label: 'Analytics', href: '/seller/analytics' },
        ]
      });
    }

    if (userRoles.includes('logistics')) {
      items.push({
        icon: FiTruck,
        label: 'Delivery Dashboard',
        href: '/delivery/dashboard',
        submenu: [
          { label: 'Deliveries', href: '/delivery/dashboard' },
          { label: 'Route Planning', href: '/delivery/routes' },
          { label: 'Earnings', href: '/delivery/earnings' },
        ]
      });
    }

    return items;
  };

  const dashboardItems = getDashboardItems();

  // Profile & Settings sections
  const profileItems = [
    {
      icon: FiUser,
      label: 'Profile',
      submenu: [
        { label: 'View Profile', onClick: onViewProfile },
        { label: 'Edit Profile', href: '/profile/edit' },
        { label: 'Privacy Settings', href: '/profile/privacy' },
      ]
    },
    {
      icon: FiBox,
      label: 'Business Profiles',
      show: userRoles.some(role => ['seller', 'logistics'].includes(role)),
      submenu: [
        userRoles.includes('seller') && { 
          label: 'Seller Profile',
          href: '/profile/seller',
          icon: FiShoppingBag
        },
        userRoles.includes('logistics') && { 
          label: 'Delivery Profile',
          href: '/profile/delivery',
          icon: FiTruck
        }
      ].filter(Boolean)
    }
  ];

  const accountItems = [
    { icon: FiBell, label: 'Notifications', href: '/notifications' },
    { icon: FiCreditCard, label: 'Payment Methods', href: '/payments' },
    { icon: FiMapPin, label: 'Addresses', href: '/addresses' },
    { icon: FiSettings, label: 'Account Settings', href: '/settings' },
  ];

  // Customer-specific items
  const customerItems = userRoles.includes('customer') ? [
    { icon: FiShoppingCart, label: 'My Orders', href: '/orders' },
    { icon: FiHeart, label: 'Wishlist', href: '/wishlist' },
  ] : [];

  const renderSubmenuItems = (items) => (
    items.map((item, idx) => (
      <Menu.Item key={idx}>
        {({ active }) => (
          item.onClick ? (
            <button
              onClick={item.onClick}
              className={`${
                active ? 'bg-gray-50 text-primary' : 'text-gray-700'
              } flex items-center w-full px-4 py-2 text-sm transition-colors`}
            >
              {item.icon && <item.icon className="w-4 h-4 mr-3" />}
              {item.label}
            </button>
          ) : (
            <a
              href={item.href}
              className={`${
                active ? 'bg-gray-50 text-primary' : 'text-gray-700'
              } flex items-center px-4 py-2 text-sm transition-colors`}
            >
              {item.icon && <item.icon className="w-4 h-4 mr-3" />}
              {item.label}
            </a>
          )
        )}
      </Menu.Item>
    ))
  );

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors cursor-pointer">
        <FiUser className="w-5 h-5" />
        <span className="hidden md:block">Account</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 cursor-pointer right-0 mt-2 w-72 origin-top-right bg-white rounded-xl shadow-lg border border-gray-100 focus:outline-none divide-y divide-gray-100">
          {/* User Info Section */}
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FiUser className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
              </div>
            </div>
          </div>

          {/* Dashboards Section */}
          {dashboardItems.length > 0 && (
            <div className="py-2">
              {dashboardItems.map((item, index) => (
                <Menu.Item key={`dashboard-${index}`}>
                  {({ active }) => (
                    <Menu as="div" className="relative w-full">
                      <Menu.Button
                        className={`${
                          active ? 'bg-gray-50 text-primary' : 'text-gray-700'
                        } flex items-center justify-between w-full px-4 py-2 text-sm transition-colors`}
                      >
                        <span className="flex items-center">
                          <item.icon className="w-5 h-5 mr-3" />
                          {item.label}
                        </span>
                        <FiGrid className="w-4 h-4" />
                      </Menu.Button>

                      <Menu.Items className="absolute left-full top-0 ml-2 w-56 origin-top-left bg-white rounded-lg shadow-lg border border-gray-100 focus:outline-none">
                        {renderSubmenuItems(item.submenu)}
                      </Menu.Items>
                    </Menu>
                  )}
                </Menu.Item>
              ))}
            </div>
          )}

          {/* Profile Section */}
          <div className="py-2 z-10">
            {profileItems.map((item, index) => (
              (item.show !== false) && (
                <Menu.Item key={`profile-${index}`}>
                  {({ active }) => (
                    <Menu as="div" className="relative w-full">
                      <Menu.Button
                        className={`${
                          active ? 'bg-gray-50 text-primary' : 'text-gray-700'
                        } flex items-center justify-between w-full px-4 py-2 text-sm transition-colors`}
                      >
                        <span className="flex items-center">
                          <item.icon className="w-5 h-5 mr-3" />
                          {item.label}
                        </span>
                        <FiGrid className="w-4 h-4" />
                      </Menu.Button>

                      <Menu.Items className="absolute left-full top-0 ml-2 w-56 origin-top-left bg-white rounded-lg shadow-lg border border-gray-100 focus:outline-none">
                        {renderSubmenuItems(item.submenu)}
                      </Menu.Items>
                    </Menu>
                  )}
                </Menu.Item>
              )
            ))}
          </div>

          {/* Customer Items */}
          {customerItems.length > 0 && (
            <div className="py-2">
              {renderSubmenuItems(customerItems)}
            </div>
          )}

          {/* Account Settings */}
          <div className="py-2">
            {renderSubmenuItems(accountItems)}
          </div>

          {/* Logout Section */}
          <div className="py-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-50 text-red-600' : 'text-gray-700'
                  } flex items-center w-full px-4 py-2 text-sm transition-colors`}
                  onClick={() => console.log('Logout')}
                >
                  <FiLogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default AccountDropdown;