import asyncHandler from 'express-async-handler'
import { ResponseHandler } from '../services/responseHandler.js';

// const menuItems = [
//     {
//         name: 'Dashboard',
//         icon: "HomeIcon",
//         path: '/',
//         roles: [1]
//     },
//     {
//         name: 'Analytics',
//         icon: "ChartBarIcon",
//         path: '/analytics',
//         roles: [1]
//     },
//     {
//         name: 'Products',
//         icon: "TagIcon",
//         roles: [1],
//         submenu: [
//             { name: 'All Products', path: '/products' },
//             { name: 'Add Product', path: '/products/add' },
//             { name: 'Categories', path: '/products/categories' },
//             { name: 'Inventory', path: '/products/inventory' }
//         ]
//     },
//     {
//         name: 'Orders',
//         icon: "ShoppingCartIcon",
//         roles: [1],
//         submenu: [
//             { name: 'All Orders', path: '/orders' },
//             { name: 'Pending', path: '/orders/pending' },
//             { name: 'Shipped', path: '/orders/shipped' },
//             { name: 'Returns', path: '/orders/returns' }
//         ]
//     },
//     {
//         name: 'Customers',
//         icon: "UsersIcon",
//         path: '/customers',
//         roles: [1]
//     },
//     {
//         name: 'User Management',
//         icon: "UserGroupIcon",
//         roles: [1],
//         submenu: [
//             { name: 'All Users', path: '/users' },
//             { name: 'Roles', path: '/admin/role-management' },
//             { name: 'Permissions', path: '/admin/role-management' },
//             { name: 'Approval', path: '/admin/user-approval' }
//         ]
//     },
//     {
//         name: 'Settings',
//         icon: "Cog6ToothIcon",
//         roles: [1],
//         submenu: [
//             { name: 'General', path: '/settings' },
//             { name: 'Security', path: '/settings/security' },
//             { name: 'Notifications', path: '/settings/notifications' }
//         ]
//     }
// ];

const menuItems = [
    {
        name: 'Dashboard',
        icon: "HomeIcon",
        path: '/',
        roles: ["SUPER ADMIN", "SELLER", "LOGISTICS", "CUSTOMER"]
    },
    {
        name: 'Analytics',
        icon: "ChartBarIcon",
        path: '/analytics',
        roles: ["SUPER ADMIN", "SELLER", "LOGISTICS", "CUSTOMER"]
    },
    {
        name: 'Products',
        icon: "TagIcon",
        roles: ["SUPER ADMIN", "SELLER"],
        submenu: [
            { name: 'All Products', path: '/products' },
            { name: 'Add Product', path: '/admin/products/add' },
            { name: 'Categories', roles: ["SUPER ADMIN"], path: '/admin/products/categories' },
            { name: 'Sub Categories', roles: ["SUPER ADMIN"], path: '/admin/products/subcategories' },
            { name: 'Inventory', path: '/products/inventory' }
        ]
    },
    {
        name: 'Orders',
        icon: "ShoppingCartIcon",
        roles: ["SUPER ADMIN", "SELLER", "CUSTOMER"],
        submenu: [
            { name: 'All Orders', path: '/orders' },
            { name: 'Pending', path: '/orders/pending' },
            { name: 'Shipped', path: '/orders/shipped' },
            { name: 'Returns', path: '/orders/returns' }
        ]
    },
    {
        name: 'Customers',
        icon: "UsersIcon",
        path: '/customers',
        roles: ["SUPER ADMIN"]
    },
    {
        name: 'User Management',
        icon: "UserGroupIcon",
        roles: ["SUPER ADMIN"],
        submenu: [
            { name: 'All Users', path: '/users' },
            { name: 'Roles', path: '/admin/role-management' },
            { name: 'Permissions', path: '/admin/role-management' },
            { name: 'Approval', path: '/admin/user-approval' }
        ]
    },
    {
        name: 'Settings',
        icon: "Cog6ToothIcon",
        roles: ["SUPER ADMIN"],
        submenu: [
            { name: 'General', path: '/settings' },
            { name: 'Security', path: '/settings/security' },
            { name: 'Notifications', path: '/settings/notifications' }
        ]
    }
];


// export const getMenuItems = asyncHandler(async(req,res)=>{
//     return ResponseHandler.success(res,{menuItems},'Menu items has sent successfully',201);
// })

export const getMenuItems = asyncHandler(async (req, res) => {
    console.log("Request has come to the getMenuItems controller");
    const { userRoles } = req.body; // Get role names
    console.log("User roles:", userRoles);
    if (!userRoles) return ResponseHandler.error(res, null, "User roles not found", 400); // Error if roles
    // Filter menu based on roles

    // Filter menu based on roles
    const filteredMenu = filteredMenuByRoles(menuItems, userRoles);

    return ResponseHandler.success(res, { menuItems: filteredMenu }, 'Menu items sent successfully', 201);
});

export const filteredMenuByRoles = (menu, userRoles) => {
    return menu
        .map((item) => {
            if (item.roles && !item.roles.some(role => userRoles.includes(role))) {
                return null;
            }
            // copy the items for the references
            const filteredItem = { ...item };
            if (filteredItem.submenu) {
                filteredItem.submenu = filteredMenuByRoles(filteredItem.submenu, userRoles);
                if (filteredItem.submenu.length === 0) {
                    return null;
                }
            }
            return filteredItem;
        })
        .filter(Boolean);
}
