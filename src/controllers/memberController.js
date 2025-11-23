import { StatusCodes } from "http-status-codes";

import { isMemberPartOfWorkspaceService } from "../service/memberService.js";
import { customErrorResponse, customSuccessResponse, internalServerErrorResponse } from "../utils/common/responseObjects.js";

export const isUserPartOfWorkspaceController = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const requestingUserId = req.user;
        const isPartOfWorkspace = await isMemberPartOfWorkspaceService(requestingUserId, workspaceId);
        res.status(StatusCodes.OK).json(customSuccessResponse({ isPartOfWorkspace }, "User membership status fetched successfully"));
    } catch (error) {
        console.error("Error in controller:", error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerErrorResponse(error));
    }
}