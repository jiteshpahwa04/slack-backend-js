import { StatusCodes } from "http-status-codes";

import { getMessagesService } from "../service/messageService.js";
import { customErrorResponse, customSuccessResponse, internalServerErrorResponse } from "../utils/common/responseObjects.js";

export const getMessagesController = async (req, res) => {
    try {
        const messages = await getMessagesService(
            { channelId: req.params.channelId, requestingUserId: req.user },
            parseInt(req.query.page) || 1,
            parseInt(req.query.limit) || 20
        );
        return res.status(StatusCodes.OK).json(customSuccessResponse(messages, "Messages retrieved successfully"));
    } catch (error) {
        console.error("Error in messageController:", error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerErrorResponse(error));
    }
}