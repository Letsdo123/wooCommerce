import { useEffect } from "react"
import { showError,showSuccess } from "./toastNotofication"

const useToastNotification = (error,success,clearError,clearSuccess)=>{
    useEffect(() => {
        if (error) {
            showError(error)
            clearError()
        }
        else if(success){
            showSuccess(success)
            clearSuccess()
        }
    }, [error,success,clearError,clearSuccess])
}

export default useToastNotification