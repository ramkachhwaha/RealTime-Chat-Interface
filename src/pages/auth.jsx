// src/Auth.jsx
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import apiRequestHandler from "../webservices/getway";
import urls from "../webservices/endpointUrls"
import { Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Auth = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const { register, reset, handleSubmit, formState: { errors } } = useForm()

    const handleLogin = useCallback(async (data) => {
        setLoading(true)
        let response = await apiRequestHandler("POST", urls.LOGIN_USER, data);
        if (response.success) {
            window.localStorage.setItem("token", response.data.accessToken)
            navigate("/c");
            reset()
        } else {
            toast.error(response.message)
        }
        setLoading(false);
    }, [navigate, reset]);

    const handleSignup = (data) => {

    };


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
                            onClick={() => setIsLogin(true)}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${isLogin ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsLogin(false)}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${!isLogin ? "bg-pink-600 text-white" : "bg-gray-100 text-gray-700"}`}
                        >
                            Sign up
                        </button>
                    </div>
                </div>

                {/* Success / Error Message */}
                <div className="px-6 mt-4">
                    {(errors.username?.message || errors.password?.message) && (
                        <div
                            role="status"
                            aria-live="polite"
                            className={`p-3 rounded-md text-sm bg-red-50 text-red-800 border border-red-100"`}
                        >
                            {errors.username?.message || errors.password?.message}
                        </div>
                    )}
                </div>

                {/* Sliding panels wrapper */}
                <div className="mt-3">
                    <div
                        className={`flex w-[200%] transform transition-transform duration-500 ${isLogin ? "translate-x-0" : "-translate-x-1/2"}`}
                        style={{ willChange: "transform" }}
                    >
                        {/* Login panel (left) */}
                        <div className="w-1/2 px-8 pb-4 bg-gray-50">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome back</h2>
                            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                                <div>
                                    <label htmlFor="username" className="block text-sm text-gray-700 mb-1">Email</label>
                                    <input
                                        id="username"
                                        type="text"
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="you@domain.com"
                                        {...register("username", { required: "username can not be empty" })}
                                    />
                                    {errors.username?.message && <p className="text-red-600 text-sm">{errors.username?.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm text-gray-700 mb-1">Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="Your password"
                                        {...register("password", { required: "password is Required" })}
                                    />
                                    {errors.password?.message && <p className="text-red-600 text-sm">{errors.password?.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className={`${loading ? "bg-indigo-400 cursor-progress" : "bg-indigo-600"} w-full  text-white py-3 rounded-lg font-semibold hover:bg-indigo-400 transition cursor-pointer`}
                                    disabled={loading}
                                >
                                    Login
                                </button>
                            </form>

                            <p className="text-sm text-gray-600 mt-4">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(false)}
                                    className="text-indigo-600 font-medium hover:underline"
                                >
                                    Create one
                                </button>
                            </p>
                        </div>

                        {/* Signup panel (right) */}
                        {!isLogin && <div className="w-1/2 px-8 pb-3 bg-gray-50">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create account</h2>
                            <form onSubmit={handleSignup} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Full name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                                        placeholder="Your full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                                        placeholder="you@domain.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                                        placeholder="Create password"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Confirm password</label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                                        placeholder="Confirm password"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
                                >
                                    Sign up
                                </button>
                            </form>

                            <p className="text-sm text-gray-600 mt-4">
                                Already registered?{" "}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(true)}
                                    className="text-pink-600 font-medium hover:underline"
                                >
                                    Login
                                </button>
                            </p>
                        </div>}
                    </div>
                </div>

                {/* small footer */}
                <div className="px-8 py-6 text-center text-xs text-gray-500">
                    By continuing you agree to our <span className="underline">Terms</span> & <span className="underline">Privacy</span>.
                </div>
            </div>
        </div>
    );
};

export default Auth;
