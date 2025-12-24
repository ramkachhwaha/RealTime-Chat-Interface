// src/Auth.jsx
import { lazy, Suspense, useState } from "react";
import { Navigate } from "react-router";
import Loader from "../components/loaders/loader";

const Login = lazy(() => import("../components/authForms/login"));
const SignUp = lazy(() => import("../components/authForms/signup"));

const Auth = () => {

    const [showLoginUi, setShowLoginUi] = useState(true);


    if (window.localStorage.getItem("token")) {
        return <Navigate to="/c" />
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative">
                {/* Header */}
                <div className="px-6 py-6 bg-white/90 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-indigo-600">ChatSphere</h1>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setShowLoginUi(true)}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${showLoginUi ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowLoginUi(false)}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${!showLoginUi ? "bg-pink-600 text-white" : "bg-gray-100 text-gray-700"}`}
                        >
                            Sign up
                        </button>
                    </div>
                </div>

                {/* Sliding panels wrapper */}
                <Suspense fallback={<Loader />}>
                    <div className="mt-3">
                        <div
                            className={`flex w-[200%] transform transition-transform duration-500 ${showLoginUi ? "translate-x-0 h-80" : "-translate-x-1/2"}`}
                            style={{ willChange: "transform" }}
                        >
                            <Login setShowLoginUi={setShowLoginUi} />
                            <SignUp setShowLoginUi={setShowLoginUi} />
                        </div>
                    </div>
                </Suspense>
                {/* small footer */}
                <div className="px-8 py-6 text-center text-xs text-gray-500">
                    By continuing you agree to our <span className="underline">Terms</span> & <span className="underline">Privacy</span>.
                </div>
            </div>
        </div>
    );
};

export default Auth;
