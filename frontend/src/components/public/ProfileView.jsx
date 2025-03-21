import React, { useEffect, useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiDollarSign, FiEdit, FiFileText, FiX, FiDownload, FiEye } from 'react-icons/fi';
import EditProfileModal from './EditProfileModal';

// This is document preview function
// It's need url & onClose function
function DocumentPreview({ url, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-4 max-w-4xl w-full max-h-[90vh] m-4 flex flex-col">
                <div className="flex justify-end mb-2">
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-1 min-h-0">
                    <iframe
                        src={url}
                        className="w-full h-full min-h-[500px] rounded-lg border border-gray-200"
                        title="Document Preview"
                    />
                </div>
            </div>
        </div>
    );
}

// This is the main profile view function
function ProfileView({ data, documents, onEdit }) {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [profileData, setProfileData] = useState(data);
    const handlePreview = (url) => {
        setPreviewUrl(url);
    };

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleUpdate = (updatedData) => {
        setProfileData(updatedData);
        onEdit?.(updatedData);
    };

    const documentTypes = {
        identityProof: "Identity Proof",
        addressProof: "Address Proof",
        businessLicense: "Business License",
        fssaiCertificate: "FSSAI Certificate"
    };

    if (!profileData || Object.keys(profileData).length === 0) return <p>Loading...</p>;
    else
        return (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="relative h-32 bg-gradient-to-r from-primary to-red-500">
                    <div className="absolute -bottom-12 left-8">
                        <div className="w-24 h-24 rounded-full bg-white p-1">
                            <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                                <FiUser className="w-12 h-12 text-primary" />
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleEditClick}
                        className="absolute top-4 right-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors flex items-center space-x-2"
                    >
                        <FiEdit className="w-4 h-4" />
                        <span>Edit Profile</span>
                    </button>
                </div>

                {/* Content */}
                <div className="pt-16 px-8 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Business Information */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-200">
                                Business Information
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <FiUser className="w-5 h-5 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500">Business Name</p>
                                        <p className="font-medium text-gray-900">{profileData?.basicDetails?.business_name}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <FiUser className="w-5 h-5 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500">Owner Name</p>
                                        <p className="font-medium text-gray-900">{profileData?.basicDetails?.owner_name}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <FiMail className="w-5 h-5 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium text-gray-900">{profileData?.basicDetails?.business_email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <FiPhone className="w-5 h-5 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500">Mobile</p>
                                        <p className="font-medium text-gray-900">{profileData?.basicDetails?.business_mobile}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <FiDollarSign className="w-5 h-5 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500">GSTIN</p>
                                        <p className="font-medium text-gray-900">{profileData?.basicDetails?.gstin}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-200">
                                Address Information
                            </h3>

                            <div className="space-y-4">
                                {profileData?.address && profileData.address.map((address) => (
                                    <div className="flex items-start space-x-3">
                                        <FiMapPin className="w-5 h-5 text-gray-400 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-500">Business Address</p>
                                            <p className="font-medium text-gray-900">{address.address}</p>
                                            <p className="text-gray-600">
                                                {address?.city}, {address?.state} - {address?.postal_code}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                        {/* Bank Information */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-200">
                                Bank Information
                            </h3>

                            <div className="space-y-4">
                                {profileData?.bank_details && profileData.bank_details.map((bank) => (
                                    < div className="flex items-start space-x-3" >
                                        <FiDollarSign className="w-5 h-5 text-gray-400 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-500">Bank Details</p>
                                            <p className="font-medium text-gray-900">{bank.bank_name}</p>
                                            <p className="text-gray-600">Account: {bank.account_number}</p>
                                            <p className="text-gray-600">IFSC: {bank.ifsc_code}</p>
                                            <p className="text-gray-600">Type: {bank.account_type}</p>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                        {/* Business Metrics */}
                        <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-200">
                            Business Metrics
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-500">Delivery Capacity</p>
                                <p className="text-2xl font-semibold text-gray-900">{profileData?.basicDetails?.delivery_capacity}</p>
                                <p className="text-xs text-gray-500">orders/day</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-500">Total Orders</p>
                                <p className="text-2xl font-semibold text-gray-900">2,451</p>
                                <p className="text-xs text-gray-500">lifetime</p>
                            </div>
                        </div>
                    </div>

                        {/* Documents Section */}
                        {documents && (
                        <div className="col-span-full space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-200">
                                Documents
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {documents.map((doc, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-primary/30 transition-colors"
                                    >
                                        <div className="flex items-center justify-center w-full h-24 mb-4 bg-white rounded-lg border border-gray-200">
                                            <FiFileText className="w-12 h-12 text-gray-400" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-900 mb-2">
                                            {documentTypes[doc.documentType]}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <button
                                                onClick={() => handlePreview(doc.publicId)}
                                                className="flex items-center text-sm text-primary hover:text-primary-600 transition-colors"
                                            >
                                                <FiEye className="w-4 h-4 mr-1" />
                                                View
                                            </button>
                                            <a
                                                href={doc.publicId}
                                                download
                                                className="flex items-center text-sm text-primary hover:text-primary-600 transition-colors"
                                            >
                                                <FiDownload className="w-4 h-4 mr-1" />
                                                Download
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    </div>
                </div>

                {/* Document Preview Modal */}
                {
                    previewUrl && (
                        <DocumentPreview url={previewUrl} onClose={() => setPreviewUrl(null)} />
                    )
                }

                {/* Edit Profile Modal */}
                <EditProfileModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    data={profileData}
                    onUpdate={handleUpdate}
                />
            </div >
        );
}

export default ProfileView;