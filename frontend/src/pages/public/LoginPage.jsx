import React from 'react';
import { useForm } from 'react-hook-form';
import Logo from '../../components/public/Logo';
import { useLoginMutation, useLogoutMutation } from '../../features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function LoginPage() {
    const { user } = useSelector((state) => state.auth)
    // checking the user details when user logged in
    useEffect(() => {
        console.log("User details in login page retirved details:", user);
    }, [user])
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { navigate } = useNavigate()
    const [login] = useLoginMutation()
    const [logout] = useLogoutMutation()

    const onSubmit = async (credentials) => {
        console.log("Login Data", credentials);
        const { data, error } = await login(credentials);
        // const {data,error} = await logout();
        console.log("Login details after api calling", data, error);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                {/* Upload Profile Picture Icon */}
                <div className="flex flex-col items-center mb-6">
                    <div className="flex items-center justify-center">
                        <Logo />
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Happy to onboard on you foodtrove</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-6">
                        {/* Email/Mobile Input */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">
                                Email/Mobile*
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Your email/mobile"
                                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                {...register('identifier', {
                                    required: 'Email or mobile is required',
                                    validate: (value) => {
                                        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
                                        const mobilePattern = /^[6-9]\d{9}$/; // Adjust regex based on your country
                                        if (!emailPattern.test(value) && !mobilePattern.test(value)) {
                                            return 'Enter a valid email or mobile number';
                                        }
                                        return true;
                                    },
                                })}
                            />
                            {errors.identifier && (
                                <p className="text-red-500 text-sm mt-1">{errors.identifier.message}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">
                                Password*
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                {...register('password', { required: 'Password is required' })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button & Signup Link */}
                    <div className="mt-6 flex flex-col items-center">
                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Login
                        </button>
                        <p className="text-sm text-gray-500 mt-3">
                            Don't have an account?{' '}
                            <a href="#" className="text-red-500 hover:underline">
                                Sign up
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
