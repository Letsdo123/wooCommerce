import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../features/modalSlice';
import { useLocation } from 'react-router-dom';

const PasswordResetHandler = () => {
    const query = new URLSearchParams(useLocation().search);
    const token = query.get("token");
    const dispatch = useDispatch();
    console.log("Token value:",token);
    useEffect(() => {
        // Open password reset modal and pass the token
        dispatch(openModal({ modalType: 'Reset Password', footer: false, modalTitle: "Enter New Password", extraModalInfo:{token} }));
    }, [token, dispatch]);

    return null; // No UI is needed; it’s just for opening the modal
};

export default PasswordResetHandler;
