import { Navigate, Outlet, useNavigate } from "react-router";
import apiRequestHandler from "../webservices/getway";
import urls from "../webservices/endpointUrls"
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ProtectedRoute() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let auth = window.localStorage.getItem("token");


    useEffect(() => {
        (async () => {
            if (auth) {
                let response = await apiRequestHandler("get", urls.ME, {}, {
                    'Authorization': `Bearer ${auth}`
                });
                if (!response.success) {
                    window.localStorage.removeItem("token");
                    navigate("/login")
                }
            }
        })()
    }, [auth, navigate]);

    return (
        <>
            {auth ? <Outlet /> : <Navigate to="/login" />}
        </>
    )

}
