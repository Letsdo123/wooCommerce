import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser, FiMapPin, FiUpload, FiStar, FiShoppingBag, FiDollarSign } from "react-icons/fi";
import FormSectionTitle from "../../components/public/FormSectionTitle";
import BackButton from "../../components/public/BackButton";
import { useNavigate } from "react-router-dom";
import DocumentUploadSection from "../../components/sections/DocumentUploadSection";
import { useGenerateUploadUrlMutation } from "../../features/auth/authApi";
import uploadImageUrl from "../../utils/imageUpload";
import Loader from "./Loader";
import { useCreateApprovalMutation } from "../../features/approval/approvalApi";
import useToast from "../../utils/toastNotofication";

function SellerRegistrationForm() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const [generateUploadUrl] = useGenerateUploadUrlMutation()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [createApproval] = useCreateApprovalMutation()
    const { showSuccess, showError } = useToast()

    const onSubmit = async (data) => {
        console.log("Seller form submitted:", data);
        const files = data.documents
        console.log("Seller registration file details:", files);
        // insert this files into a array and create a wrapper of promise all
        // and call the function
        setIsSubmitting(true)
        const uploadAllDocuments = await Promise.all(
            Object.entries(files).map(async ([key, file]) => {
                if (!file) return null;
                // Generate timestamp
                const timestamp = Math.floor(Date.now() / 1000);
                // Call mutation to get signed URL
                const { data } = await generateUploadUrl({
                    folder: 'seller_documents',
                    timestamp,
                    context: key
                });
                return await uploadImageUrl(file, key, data)
            })
        )

        // preparing the data for the approval request
        delete data.documents
        console.log("Seller data", data);

        // now creating the documents
        // now creating the documents
        const updatedDocuments = uploadAllDocuments.map((docs) => {
            return {
                documentType: docs.context.custom.document_type,
                publicId: docs.public_id,
                fileType: docs.resource_type,
            }
        })
        console.log("Updated documents", updatedDocuments);
        const { data: approvalStatus, error } = await createApproval({
            entityType: 'User',
            details: data,
            documents: updatedDocuments
        })
        console.log("Data:", approvalStatus);
        // console.log("Error:",error);

        // show message according to the data
        if (approvalStatus != undefined) {
            showSuccess("Seller approval is pending");
        }
        else showError(error.data.message)
        // This is for hiding the loader
        setIsSubmitting(false)
        // Navigating to the main page after successful seller registration
        onBack()

        console.log("Successfully uploaded all seller documents:", uploadAllDocuments);
    };
    const onBack = () => {
        navigate('/')
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
            {isSubmitting && <Loader />}
            <div className="max-w-4xl mx-auto px-4">
                {/* Header Section */}
                <div className="form-header h-64 mb-8 relative">
                    <BackButton onClick={onBack} customClass={`top-4 right-4`} />
                    <div className="relative z-10 h-full flex items-center justify-between px-8">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                                <FiStar className="w-4 h-4 text-yellow-300 mr-2" />
                                <span className="text-white text-sm">Join 5000+ successful sellers</span>
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-4">Seller Partner Registration</h2>
                            <p className="text-white/90 text-lg mb-6">
                                Transform your business's future with our platform
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="stat-card">
                                    <FiShoppingBag className="w-5 h-5 text-white mr-2" />
                                    <span className="text-white">5000+ Partners</span>
                                </div>
                                <div className="stat-card">
                                    <FiDollarSign className="w-5 h-5 text-white mr-2" />
                                    <span className="text-white">2x Revenue Growth</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Business Information */}
                    <div className="form-section">
                        <FormSectionTitle icon={FiUser} title="Business Information" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="form-label">Business Name *</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    {...register("basic_details.business_name", { required: "Business Name is required" })}
                                    placeholder="Enter business name"
                                />
                                {errors.basic_details?.business_name && <p className="text-red-500 text-sm">{errors.business_name.message}</p>}
                            </div>
                            <div>
                                <label className="form-label">Owner Name *</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    {...register("basic_details.owner_name", { required: "Owner Name is required" })}
                                    placeholder="Enter owner name"
                                />
                                {errors.basic_details?.owner_name && <p className="text-red-500 text-sm">{errors.owner_name.message}</p>}
                            </div>
                            <div>
                                <label className="form-label">Business Email *</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    {...register("basic_details.business_email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email format",
                                        },
                                    })}
                                    placeholder="Enter business email"
                                />
                                {errors.basic_details?.business_email && <p className="text-red-500 text-sm">{errors.business_email.message}</p>}
                            </div>
                            <div>
                                <label className="form-label">Business Mobile *</label>
                                <input
                                    type="tel"
                                    className="form-input"
                                    {...register("basic_details.business_mobile", { required: "Mobile number is required" })}
                                    placeholder="Enter business mobile"
                                />
                                {errors.business_mobile && <p className="text-red-500 text-sm">{errors.business_mobile.message}</p>}
                            </div>
                            <div>
                                <label className="form-label">GSTIN No *</label>
                                <input
                                    type="tel"
                                    className="form-input"
                                    {...register("basic_details.gstin", { required: "GSTIN number is required" })}
                                    placeholder="Enter gstin number"
                                />
                                {errors.basic_details?.gstin && <p className="text-red-500 text-sm">{errors.business_mobile.message}</p>}
                            </div>
                            <div>
                                <label className="form-label">Delivery Capacity *</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    {...register("basic_details.delivery_capacity", { required: "Delivery capacity is required" })}
                                    placeholder="Enter delivery capacity"
                                />
                                {errors.basic_details?.gstin && <p className="text-red-500 text-sm">{errors.business_mobile.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Business Address */}
                    <div className="form-section">
                        <FormSectionTitle icon={FiMapPin} title="Business Address" />
                        <div className="space-y-6">
                            <div>
                                <label className="form-label">Complete Address *</label>
                                <textarea
                                    rows={3}
                                    className="form-input"
                                    {...register("address.address", { required: "Address is required" })}
                                    placeholder="Enter complete business address"
                                />
                                {errors.address?.address && <p className="text-red-500 text-sm">{errors.address.address.message}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="form-label">City *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        {...register("address.city", { required: "City is required" })}
                                        placeholder="Enter city"
                                    />
                                    {errors.address?.city && <p className="text-red-500 text-sm">{errors.address.city.message}</p>}
                                </div>
                                <div>
                                    <label className="form-label">State *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        {...register("address.state", { required: "State is required" })}
                                        placeholder="Enter state"
                                    />
                                    {errors.address?.state && <p className="text-red-500 text-sm">{errors.address.state.message}</p>}
                                </div>
                                <div>
                                    <label className="form-label">Country *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        {...register("address.country", { required: "Country is required" })}
                                        placeholder="Enter country"
                                    />
                                    {errors.address?.country && <p className="text-red-500 text-sm">{errors.address.country.message}</p>}
                                </div>
                                <div>
                                    <label className="form-label">Postal Code *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        {...register("address.postalCode", { required: "Postal Code is required" })}
                                        placeholder="Enter postal code"
                                    />
                                    {errors.address?.postalCode && <p className="text-red-500 text-sm">{errors.address.postalCode.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bank Details */}
                    <div className="form-section">
                        <FormSectionTitle icon={FiUpload} title="Bank Details" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="form-label">Account Holder Name *</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    {...register("bank.account_holder_name", { required: "Account holder name is required" })}
                                    placeholder="Enter account holder name"
                                />
                                {errors.bank?.account_holder_name && (
                                    <p className="text-red-500 text-sm">{errors.bank.account_holder_name.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="form-label">Bank Name *</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    {...register("bank.bank_name", { required: "Bank Name is required" })}
                                    placeholder="Enter bank name"
                                />
                                {errors.bank?.bank_name && <p className="text-red-500 text-sm">{errors.bank.bank_name.message}</p>}
                            </div>
                            <div>
                                {/* Account Number */}
                                <label className="form-label">Account Number *</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    {...register("bank.account_number", { required: "Account Number is required" })}
                                    placeholder="Enter account number"
                                />
                                {errors.bank?.account_number && <p className="text-red-500 text-sm">{errors.bank.account_number.message}</p>}
                            </div>

                            <div>
                                {/* IFSC Code */}
                                <label className="form-label">IFSC Code *</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    {...register("bank.ifsc_code", { required: "IFSC Code is required" })}
                                    placeholder="Enter IFSC code"
                                />
                                {errors.bank?.ifsc_code && <p className="text-red-500 text-sm">{errors.bank.ifsc_code.message}</p>}
                            </div>

                            <div>
                                {/* UPI ID */}
                                <label className="form-label">UPI ID</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    {...register("bank.upi_id")}
                                    placeholder="Enter UPI ID (optional)"
                                />
                                {errors.bank?.upi_id && <p className="text-red-500 text-sm">{errors.bank.upi_id.message}</p>}
                            </div>

                            <div>
                                {/* Account Type */}
                                <label className="form-label">Account Type *</label>
                                <select
                                    className="form-input"
                                    {...register("bank.account_type", { required: "Account Type is required" })}
                                >
                                    <option value="">Select account type</option>
                                    <option value="savings">Savings</option>
                                    <option value="current">Current</option>
                                </select>
                                {errors.bank?.account_type && <p className="text-red-500 text-sm">{errors.bank.account_type.message}</p>}
                            </div>
                        </div>
                    </div>
                    {/* Document upload section */}
                    <DocumentUploadSection control={control} />
                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-8 py-4 bg-primary text-white rounded-xl hover:bg-red-600 transition-colors font-semibold flex items-center space-x-2 shadow-lg shadow-primary/30 hover:shadow-primary/50"
                        >
                            <span>Submit Application</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SellerRegistrationForm;
