export class ResponseHandler{
    // This is the method to hadle the success
    static success(res,data={},message='Success',statusCode = 200){
        return res.status(statusCode).json({
            status:'success',
            message,
            data
        })
    }
    // This is the method to hadle the error
    static error(res,data={},message='Error',statusCode = 500){
        return res.status(statusCode).json({
            status:'error',
            message,
            data
        })
    }
    // This is the method to hadle the validation error
    static validationError(res,data={},message='Validation Error',statusCode = 400){
        return res.status(statusCode).json({
            status:'fail',
            message,
            data
        })
    }
}