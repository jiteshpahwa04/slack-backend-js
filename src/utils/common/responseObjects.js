export const internalServerErrorResponse = (error) => {
    return {
        success: false,
        err: error,
        data: {},
        message: "Internal Server Error"
    }
}

export const customErrorResponse = (error) => {
    if (!error.message && !error.explanation) {
        return internalServerErrorResponse(error);
    }
    return {
        success: false,
        err: error.explanation,
        data: {},
        message: error.message
    }
}

export const customSuccessResponse = (data, message = "Request processed successfully") => {
    return {
        success: true,
        err: {},
        data: data,
        message: message
    }
}