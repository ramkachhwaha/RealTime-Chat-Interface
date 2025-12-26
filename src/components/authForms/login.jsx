import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import apiRequestHandler from "../../webservices/getway";
import endpointUrls from "../../webservices/endpointUrls";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Login({ setShowLoginUi }) {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const { register, reset, handleSubmit, formState: { errors } } = useForm()

    // fn for login form
    const handleLogin = useCallback(async (data) => {
        setLoading(true)
        let response = await apiRequestHandler("POST", endpointUrls.LOGIN_USER, data);
        if (response.success) {
            console.log(response);

            window.localStorage.setItem("token", response.data.token)
            navigate("/c");
            reset()
        } else {
            toast.error(response.message)
        }
        setLoading(false);
    }, [navigate, reset]);

    return (
        <>
            <div className="w-1/2 px-8 pb-4 bg-gray-50">
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
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome back</h2>
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm text-gray-700 mb-1">Email | mobile</label>
                        <input
                            id="username"
                            type="text"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="email | mobile"
                            {...register("login_user", { required: "username can not be empty" })}
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
                        onClick={() => setShowLoginUi(false)}
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Create one
                    </button>
                </p>
            </div>
        </>
    )
}
