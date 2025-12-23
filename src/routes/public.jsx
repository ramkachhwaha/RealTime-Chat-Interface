import { Navigate, Outlet } from "react-router";
import Header from "../components/header";
import Footer from "../components/footer";

export default function PublicRoute() {

    if (window.localStorage.getItem("token")) {
        return <Navigate to="/c" />
    }

    return (
        <>
            <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}
