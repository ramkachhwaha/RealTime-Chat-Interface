import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import apiRequestHandler from '../../webservices/getway';
import endpointUrls from '../../webservices/endpointUrls';

export default function Signup({ setShowLoginUi }) {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        success: "",
        error: ""
    });

    const { register, reset, handleSubmit, formState: { errors } } = useForm();


    // fn for sign up  form
    const handleSignup = useCallback(async (data) => {
        setLoading(true)
        let response = await apiRequestHandler("POST", endpointUrls.SIGNUP_USER, data);
        if (response.success) {
            setMessage({ success: response.message })
            reset()
            setShowLoginUi(true);
        } else {
            setMessage({ error: response.message })
        }
        setLoading(false);
    }, [reset, setShowLoginUi]);

    return (
        <>
            <div className="w-1/2 px-8 pb-3 bg-gray-50">
                {/* Success / Error Message */}
                <div className="px-6 mt-4">
                    {(message.success) && (
                        <div
                            role="status"
                            aria-live="polite"
                            className={`p-3 rounded-md text-sm bg-green-50 text-green-800 border border-green-100 `}
                        >
                            {message.success}
                        </div>
                    )}
                    {(message.error) && (
                        <div
                            role="status"
                            aria-live="polite"
                            className={`p-3 rounded-md text-sm bg-red-50 text-red-800 border border-red-100 `}
                        >
                            {message.error}
                        </div>
                    )}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create account</h2>
                <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Full name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                            placeholder="Your Name"
                            {...register("user_name", { required: "Full name is required", pattern: /^[A-Za-z]+$/i, minLength: 2, maxLength: 32 })}
                        />
                        {(errors.user_name?.message) && (
                            <div
                                role="status"
                                aria-live="polite"
                                className="text-sm bg-red-50 text-red-800"
                            >
                                {errors.user_name?.message}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                            placeholder="you@domain.com"
                            {...register("email", {
                                required: "email is required", pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "email id is not valid"

                                }
                            })}
                        />
                        {(errors.email?.message) && (
                            <div
                                role="status"
                                aria-live="polite"
                                className="text-sm bg-red-50 text-red-800"
                            >
                                {errors.email?.message}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Phone No</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                            placeholder="Mobile Number"
                            {...register("phone", {
                                required: "mobile no. is required", pattern: {
                                    value: /^(\+91[/-\s]?)?[0]?(91)?[6-9]\d{9}$/,
                                    message: "invalid mobile number"
                                }
                            })}
                        />
                        {(errors.phone?.message) && (
                            <div
                                role="status"
                                aria-live="polite"
                                className="text-sm bg-red-50 text-red-800"
                            >
                                {errors.phone?.message}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                            placeholder="Enter password"
                            {...register("password", { required: "password is required" })}
                        />
                        {(errors.password?.message) && (
                            <div
                                role="status"
                                aria-live="polite"
                                className="text-sm bg-red-50 text-red-800"
                            >
                                {errors.password?.message}
                            </div>
                        )}
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className={`w-full ${loading ? "bg-pink-400 cursor-progress" : "bg-pink-600"} text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition`}
                    >
                        Sign up
                    </button>
                </form>

                <p className="text-sm text-gray-600 mt-4">
                    Already registered?{" "}
                    <button
                        type="button"
                        onClick={() => setShowLoginUi(true)}
                        className="text-pink-600 font-medium hover:underline"
                    >
                        Login
                    </button>
                </p>
            </div>
        </>
    )
}
