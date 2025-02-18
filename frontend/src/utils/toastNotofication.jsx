import { toast } from "react-toastify";

const useToast = () => {
    const showSuccess = (message) => {
        toast.success(message);
    };

    const showError = (message) => {
        toast.error(message);
    };

    return { showSuccess, showError };
};

export default useToast;
