import { Outlet } from "react-router-dom"
import Header from "../components/dashboard/Header"
import Sidebar from "../components/dashboard/Sidebar"

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar />
            <div className="flex-1 transition-all duration-300 md:ml-64">
                <Header />
                <main className="pt-16 px-4">
                    <Outlet /> {/* This match the matched routed */}
                </main>
            </div>
        </div>
    )
}
export default DashboardLayout