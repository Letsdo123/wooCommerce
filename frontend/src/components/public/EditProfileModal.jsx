import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';

const EditProfileModal = ({ isOpen, onClose, data, onSubmit }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (data) {
            Object.keys(data).forEach((key) => setValue(key, data[key]));
        }
    }, [data, setValue]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] m-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Business Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">Business Name</label>
                                <input
                                    {...register('business_name')}
                                    className={`form-input ${errors.business_name ? 'border-red-500' : ''}`}
                                />
                                {errors.business_name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.business_name.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="form-label">Owner Name</label>
                                <input
                                    {...register('owner_name')}
                                    className={`form-input ${errors.owner_name ? 'border-red-500' : ''}`}
                                />
                                {errors.owner_name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.owner_name.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="form-label">Business Email</label>
                                <input
                                    {...register('business_email')}
                                    type="email"
                                    className={`form-input ${errors.business_email ? 'border-red-500' : ''}`}
                                />
                                {errors.business_email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.business_email.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="form-label">Business Mobile</label>
                                <input
                                    {...register('business_mobile')}
                                    className={`form-input ${errors.business_mobile ? 'border-red-500' : ''}`}
                                />
                                {errors.business_mobile && (
                                    <p className="text-red-500 text-sm mt-1">{errors.business_mobile.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="form-label">GSTIN</label>
                                <input
                                    {...register('gstin')}
                                    className={`form-input ${errors.gstin ? 'border-red-500' : ''}`}
                                />
                                {errors.gstin && (
                                    <p className="text-red-500 text-sm mt-1">{errors.gstin.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="form-label">Delivery Capacity</label>
                                <input
                                    {...register('delivery_capacity', { valueAsNumber: true })}
                                    type="number"
                                    className={`form-input ${errors.delivery_capacity ? 'border-red-500' : ''}`}
                                />
                                {errors.delivery_capacity && (
                                    <p className="text-red-500 text-sm mt-1">{errors.delivery_capacity.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Address Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="form-label">Address</label>
                                <textarea
                                    {...register('address.address')}
                                    rows={3}
                                    className={`form-input ${errors.address?.address ? 'border-red-500' : ''}`}
                                />
                                {errors.address?.address && (
                                    <p className="text-red-500 text-sm mt-1">{errors.address.address.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="form-label">City</label>
                                <input
                                    {...register('address.city')}
                                    className={`form-input ${errors.address?.city ? 'border-red-500' : ''}`}
                                />
                                {errors.address?.city && (
                                    <p className="text-red-500 text-sm mt-1">{errors.address.city.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="form-label">State</label>
                                <input
                                    {...register('address.state')}
                                    className={`form-input ${errors.address?.state ? 'border-red-500' : ''}`}
                                />
                                {errors.address?.state && (
                                    <p className="text-red-500 text-sm mt-1">{errors.address.state.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="form-label">Postal Code</label>
                                <input
                                    {...register('address.postal_code')}
                                    className={`form-input ${errors.address?.postal_code ? 'border-red-500' : ''}`}
                                />
                                {errors.address?.postal_code && (
                                    <p className="text-red-500 text-sm mt-1">{errors.address.postal_code.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bank Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Bank Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">Account Holder Name</label>
                                <input
                                    {...register('bank.account_holder_name')}
                                    className={`form-input ${errors.bank?.account_holder_name ? 'border-red-500' : ''}`}
                                />
                                {errors.bank?.account_holder_name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.bank.account_holder_name.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="form-label">Bank Name</label>
                                <input
                                    {...register('bank.bank_name')}
                                    className={`form-input ${errors.bank?.bank_name ? 'border-red-500' : ''}`}
                                />
                                {errors.bank?.bank_name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.bank.bank_name.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="form-label">Account Number</label>
                                <input
                                    {...register('bank.account_number')}
                                    className={`form-input ${errors.bank?.account_number ? 'border-red-500' : ''}`}
                                />
                                {errors.bank?.account_number && (
                                    <p className="text-red-500 text-sm mt-1">{errors.bank.account_number.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="form-label">IFSC Code</label>
                                <input
                                    {...register('bank.ifsc_code')}
                                    className={`form-input ${errors.bank?.ifsc_code ? 'border-red-500' : ''}`}
                                />
                                {errors.bank?.ifsc_code && (
                                    <p className="text-red-500 text-sm mt-1">{errors.bank.ifsc_code.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="form-label">UPI ID</label>
                                <input
                                    {...register('bank.upi_id')}
                                    className="form-input"
                                />
                            </div>
                            <div>
                                <label className="form-label">Account Type</label>
                                <select
                                    {...register('bank.account_type')}
                                    className={`form-input ${errors.bank?.account_type ? 'border-red-500' : ''}`}
                                >
                                    <option value="savings">Savings</option>
                                    <option value="current">Current</option>
                                    <option value="business">Business</option>
                                </select>
                                {errors.bank?.account_type && (
                                    <p className="text-red-500 text-sm mt-1">{errors.bank.account_type.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
