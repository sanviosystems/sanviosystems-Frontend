import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");

    // agar login nahi hai to AdminLogin pe bhej do
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />; // agar login hai to andar wala page open hoga
};

export default ProtectedRoute;
