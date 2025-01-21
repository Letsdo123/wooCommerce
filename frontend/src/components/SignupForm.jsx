import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import asyncHandler from "../utils/asyncHandler";
import axios from "axios";
import uploadImageUrl from "../utils/imageUpload";
import { useGenerateUploadUrlMutation } from "../features/api/authApi";

const SignupForm = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const [profilePictureUrl, setProfilePictureUrl] = useState(null)

  // destcturing from the rtk query for file upload
  const [generateUploadUrl] = useGenerateUploadUrlMutation()

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  };


  // get the password value using watch
  const password = watch('password')

  // handlign the file upload
  const handleFileUpload = async (event) => {
    console.log("File detected");
    const file = event.target.files[0];
    console.log("Filed details", file);
    if (file) {
      // Generate timestamp
      const timestamp = Math.floor(Date.now() / 1000);

      // Call mutation to get signed URL
      const { data } = await generateUploadUrl({
        folder: 'user_profiles',
        timestamp,
      });
      const imageUrl = await uploadImageUrl(file, data)
      setProfilePictureUrl(imageUrl.secure_url)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-4xl">
        {step === 1 && (
          <form onSubmit={handleSubmit(nextStep)}>
            <div className="flex items-center justify-center mb-6">
              <label className="flex flex-col items-center cursor-pointer">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {profilePictureUrl ?
                    (<img
                      src={profilePictureUrl}
                      alt="Profile Picture"
                      className="w-full h-full object-cover"
                    />) :
                    (<svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>)}
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <span className="text-sm text-gray-500 mt-2">
                  Upload Profile Picture
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  First Name*
                </label>
                <input
                  type="text"
                  placeholder="Enter Your First Name"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  {...register("firstName", { required: "First Name is required" })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Last Name*
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Last Name"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  {...register("lastName", { required: "Last Name is required" })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  placeholder="Enter Your email"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Mobile*
                </label>
                <input
                  type="text"
                  placeholder="Enter Your mobile number"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  {...register("mobile", {
                    required: "Mobile is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid mobile number",
                    },
                  })}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobile.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Gender*
                </label>
                <select
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  {...register("gender", { required: "Gender is required" })}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Role*
                </label>
                <select
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  {...register("role", { required: "Role is required" })}
                >
                  <option value="">Select Role</option>
                  <option value="customer">Customer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Password*
                </label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Confirm Password*
                </label>
                <input
                  type="password"
                  placeholder="Enter Your confirm password"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) => {
                      return value === password || "confirm password doesn't match"
                    }
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Next
              </button>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Have an account?
              </a>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Address Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">
                  Address*
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  City*
                </label>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  {...register("city", { required: "City is required" })}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  State*
                </label>
                <input
                  type="text"
                  placeholder="State"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  {...register("state", { required: "State is required" })}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Postal Code*
                </label>
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  {...register("postalCode", {
                    required: "Postal Code is required",
                  })}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
