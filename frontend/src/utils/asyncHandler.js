const asyncHandler = (fn) => async(...args)=>{
    try {
        return await fn(...args);
    } catch (error) {
        console.error('Error',error.message);
    }
}

export default asyncHandler