// Simple role-based authentication utility
const ROLES = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    PRODUCT_ADMIN: 'PRODUCT_ADMIN',
    SELLER: 'SELLER'
  };
  
  // Mock user for demo purposes
  const currentUser = {
    id: 1,
    name: 'John Doe',
    role: ROLES.SUPER_ADMIN,
    permissions: ['manage_users', 'manage_products', 'manage_orders']
  };
  
  export const getUserRole = () => currentUser.role;
  export const hasPermission = (permission) => currentUser.permissions.includes(permission);
  export { ROLES, currentUser };