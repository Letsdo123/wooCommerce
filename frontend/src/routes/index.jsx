import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/public/Home";
import MainLayout from "../layouts/MainLayout";
import SignupForm from "../pages/public/SignupForm";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import ECommerce from "../pages/dashboard/ECommerce";
import Products from "../pages/dashboard/Products";
import Unauthorized from "../pages/Unauthorized";
import RolePermissions from "../pages/dashboard/RolePermission";
import LoginPage from "../pages/public/LoginPage";
import Role from "../pages/dashboard/Role";
import UserApproval from "../pages/dashboard/UserApproval";

const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        // Public routes with main layouts
        {
            element: <MainLayout/>,
            children:[
                {path:"/",element:<Home/>},
                {path:"register",element:<SignupForm/>},
                {path:"login",element:<LoginPage/>}
            ]
        },
        // private admin routes with dashboard layout
        {
            path: "admin",
            // element:(
            //     <PrivateRoute role={["admin","super-admin","seller"]}>
            //         <DashboardLayout/>
            //     </PrivateRoute>
            // ),
            element:<DashboardLayout/>,
            children:[
                {index:true,element:<ECommerce/>},
                {path:"products",element:<Products/>},
                {path:"role-management",element:<Role/>},
                {path:"user-approval",element:<UserApproval/>}
            ]
        },
        {
            path:"unauthorized",
            element:<Unauthorized/>
        }
    ]
}])

export default router