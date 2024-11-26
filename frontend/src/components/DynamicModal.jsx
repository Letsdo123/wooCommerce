import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../features/modalSlice';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import OtpForVerifyUser from '../pages/OtpForVerifyUser';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const DynamicModal = () => {
    const dispatch = useDispatch()
    const { isModalOpen, modalType, isFooter,modalTitle } = useSelector((state) => state.modal);
    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-1/2 mx-4">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">{modalTitle}</h2>
                    <button onClick={() => dispatch(closeModal())} className="bg-orange-500 hover:bg-orange-400 p-1 rounded-full text-white">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-4">
                    {modalType === 'Login' && <LoginPage />}
                    {modalType === 'Registration' && <RegistrationPage/>}
                    {modalType === 'User Verification Otp' && <OtpForVerifyUser/>}
                    {modalType === 'Forgot Password Modal' && <ForgotPassword/>}
                    {modalType === 'Reset Password' && <ResetPassword/>}
                </div>

                {/* Modal Footer */}
                {isFooter && (
                    <div className="p-4 border-t flex justify-end">
                        <button onClick={() => dispatch(closeModal())} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                            Close
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default DynamicModal;
