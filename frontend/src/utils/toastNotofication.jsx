// ToastNotification.js
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotification = () => {
    return <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
}

export const showError = (message) => {
    toast.error(message);
    return
}

export const showSuccess = (message) => {
    toast.success(message);
    return
}

export default ToastNotification;
