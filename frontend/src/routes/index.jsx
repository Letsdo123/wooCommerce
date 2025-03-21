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
import ProductCategory from "../pages/dashboard/ProductCategory";
import LoginPage from "../pages/public/LoginPage";
import Role from "../pages/dashboard/Role";
import UserApproval from "../pages/dashboard/UserApproval";
import SellerRegistrationForm from "../pages/public/SellerRegistrationForm";
import DeliveryPartnerForm from "../pages/public/DeliveryPartnerForm";
import UserApprovalGrid from "../components/public/UserApprovalGrid";
import SellerProfile from "../components/public/SellerProfile";
import ProductSubCategory from "../pages/dashboard/ProductSubCategory";
import AddProduct from "../pages/dashboard/AddProduct";
import PageTest from "../pages/test documentation/PageTest";
import ProfileManager from "../components/public/ProfileManager";

const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        // Public routes with main layouts
        {
            element: <MainLayout/>,
            children:[
                {path:"/",element:<Home/>},
                {path:"registration/user",element:<SignupForm/>},
                {path:"registration/seller",element:<SellerRegistrationForm/>},
                {path:"registration/logistic",element:<DeliveryPartnerForm/>},
                {path:"login",element:<LoginPage/>},
                {path:"profile/manage",element:<ProfileManager/>}
            ]
        },
        // private admin routes with dashboard layout
        {
            path: "admin",
            element:(
                <PrivateRoute role={["SUPER ADMIN","SELLER","LOGISTICS"]}>
                    <DashboardLayout/>
                </PrivateRoute>
            ),
            // element:<DashboardLayout/>,
            children:[
                {index:true,element:<ECommerce/>},
                {path:"products",element:<Products/>},
                {path:"products/add",element:<AddProduct/>},
                {path:"role-management",element:<Role/>},
                {path:"user-approval",element:<UserApprovalGrid/>},
                {path: "products/categories", element: <ProductCategory />},
                {path: "products/subcategories", element: <ProductSubCategory />},
                {path: "tab-test", element: <PageTest />}
            ]
        },
        {
            path:"unauthorized",
            element:<Unauthorized/>
        }
    ]
}])

export default router