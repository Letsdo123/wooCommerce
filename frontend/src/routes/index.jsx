import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/LoginPage";

const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        {
            path: "",
            element: <Home />,
        },
        {
            path: "login",
            element: <Login />
        }
    ]
}])

export default router