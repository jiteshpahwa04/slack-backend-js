import { StatusCodes } from "http-status-codes";

import { getChannelById } from "../service/channelService.js";
import { customErrorResponse, customSuccessResponse, internalServerErrorResponse } from "../utils/common/responseObjects.js";

export const getChannelByIdController = async (req, res) => {
    try {
        const { channelId } = req.params;
        const requestingUserId = req.user;
        const channel = await getChannelById(channelId, requestingUserId);
        res.status(StatusCodes.OK).json(customSuccessResponse(channel, "Channel fetched successfully"));
    } catch (error) {
        console.error("Error in getWorkspaceDetailsController:", error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerErrorResponse(error));
    }
}