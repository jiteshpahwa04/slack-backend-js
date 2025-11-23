import { StatusCodes } from "http-status-codes";

import { signinService, singupService } from "../service/userService.js";
import { customErrorResponse, customSuccessResponse,internalServerErrorResponse } from "../utils/common/responseObjects.js";

export const signupController = async (req, res) => {
    try {
        const user = await singupService(req.body);
        return res.status(StatusCodes.CREATED).json(customSuccessResponse(user, "User signed up successfully"));
    } catch (error) {
        console.error("Error in signupController:", error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerErrorResponse(error));
    }
}

export const signinController = async (req, res) => {
    try {
        const response = await signinService(req.body);
        return res.status(StatusCodes.OK).json(customSuccessResponse(response, "User signed in successfully"));
    } catch (error) {
        console.error("Error in signinController:", error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerErrorResponse(error));
    }
}