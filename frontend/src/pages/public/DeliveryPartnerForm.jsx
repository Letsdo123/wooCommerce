import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FiUser, FiMail, FiPhone, FiMapPin, FiTruck, FiClock, FiDollarSign } from "react-icons/fi";
import BackButton from "../../components/public/BackButton";
import { useNavigate } from "react-router-dom";

const DeliveryPartnerForm = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            address: {
                address: "",
                city: "",
                state: "",
                country: "India",
                postal_code: "",
            },
            bank: {
                account_holder_name: "",
                bank_name: "",
                account_number: "",
                ifsc_code: "",
                account_type: "savings",
                upi_id: "",
                is_primary: true,
            },
            vehicle_type: "",
            working_hours: "",
        },
    });

    const onSubmit = (data) => {
        console.log("Form submitted:", data);
    };
    const onBack = () => {
        navigate('/')
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                <BackButton onClick={onBack} customClass={`top-4 right-4`} />
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Delivery Partner Registration</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="flex items-center space-x-2 text-gray-600">
                            <FiUser className="text-gray-400" />
                            <span>Full Name</span>
                        </label>
                        <input
                            {...register("fullName", { required: "Full name is required" })}
                            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
                        />
                        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="flex items-center space-x-2 text-gray-600">
                            <FiMail className="text-gray-400" />
                            <span>Email</span>
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="flex items-center space-x-2 text-gray-600">
                            <FiPhone className="text-gray-400" />
                            <span>Phone</span>
                        </label>
                        <input
                            type="tel"
                            {...register("phone", { required: "Phone number is required", minLength: { value: 10, message: "Must be 10 digits" } })}
                            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="flex items-center space-x-2 text-gray-600">
                            <FiMapPin className="text-gray-400" />
                            <span>Address</span>
                        </label>
                        <input
                            {...register("address.address", { required: "Address is required" })}
                            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
                        />
                        {errors.address?.address && <p className="text-red-500 text-sm">{errors.address.address.message}</p>}
                    </div>

                    {/* Vehicle Type */}
                    <div>
                        <label className="flex items-center space-x-2 text-gray-600">
                            <FiTruck className="text-gray-400" />
                            <span>Vehicle Type</span>
                        </label>
                        <select
                            {...register("vehicle_type", { required: "Vehicle type is required" })}
                            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
                        >
                            <option value="">Select vehicle type</option>
                            <option value="bike">Bike</option>
                            <option value="scooter">Scooter</option>
                            <option value="car">Car</option>
                        </select>
                        {errors.vehicle_type && <p className="text-red-500 text-sm">{errors.vehicle_type.message}</p>}
                    </div>

                    {/* Working Hours */}
                    <div>
                        <label className="flex items-center space-x-2 text-gray-600">
                            <FiClock className="text-gray-400" />
                            <span>Working Hours</span>
                        </label>
                        <input
                            type="number"
                            {...register("working_hours", { required: "Working hours are required", min: { value: 1, message: "Minimum 1 hour required" } })}
                            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
                        />
                        {errors.working_hours && <p className="text-red-500 text-sm">{errors.working_hours.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DeliveryPartnerForm;