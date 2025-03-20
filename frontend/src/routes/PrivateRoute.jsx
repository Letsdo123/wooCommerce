import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children, role }) => {
    const { user, roles } = useSelector((state) => state.auth)
    const userRoles = roles.map((role) => role.name)
    // if no user found then redirected to login page
    if (!user) return <Navigate to="/login" replace />

    // Check if user has at least one required role
    if (role && !role.some(r => userRoles.includes(r))) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default PrivateRoute