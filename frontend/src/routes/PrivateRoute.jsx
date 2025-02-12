import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({children,role})=>{
    const {user} = useSelector((state)=>state.auth)

    // if no user found then redirected to login page
    if(!user) return <Navigate to="/login" replace/>

    if(role && ! role.includes(user.role)) return <Navigate to="/unauthorized" replace/>

    return children;
}

export default PrivateRoute