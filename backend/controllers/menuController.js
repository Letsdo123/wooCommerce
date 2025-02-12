import asyncHandler from 'express-async-handler'
import { ResponseHandler } from '../services/responseHandler.js';

const menuItems = [
    {
        name: 'Dashboard',
        icon: "HomeIcon",
        path: '/',
        roles: [1]
    },
    {
        name: 'Analytics',
        icon: "ChartBarIcon",
        path: '/analytics',
        roles: [1]
    },
    {
        name: 'Products',
        icon: "TagIcon",
        roles: [1],
        submenu: [
            { name: 'All Products', path: '/products' },
            { name: 'Add Product', path: '/products/add' },
            { name: 'Categories', path: '/products/categories' },
            { name: 'Inventory', path: '/products/inventory' }
        ]
    },
    {
        name: 'Orders',
        icon: "ShoppingCartIcon",
        roles: [1],
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
        roles: [1]
    },
    {
        name: 'User Management',
        icon: "UserGroupIcon",
        roles: [1],
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
        roles: [1],
        submenu: [
            { name: 'General', path: '/settings' },
            { name: 'Security', path: '/settings/security' },
            { name: 'Notifications', path: '/settings/notifications' }
        ]
    }
];

export const getMenuItems = asyncHandler(async(req,res)=>{
    return ResponseHandler.success(res,{menuItems},'Menu items has sent successfully',201);
})