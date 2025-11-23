import { StatusCodes } from "http-status-codes";

import { createWorkspaceService, deleteWorkspaceService, getWorkspacesTheUserIsPartOfService } from "../service/workspaceService.js";
import { customErrorResponse, internalServerErrorResponse } from "../utils/common/responseObjects.js";

export const createWorkspaceController = async (req, res) => {
    try {
        const workspaceData = req.body;
        workspaceData.owner = req.user;
        const response = await createWorkspaceService(workspaceData);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            data: response,
            message: "Workspace created successfully"
        });
    } catch (error) {
        console.error("Error in signupController:", error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerErrorResponse(error));
    }
}

export const getWorkspacesTheUserIsPartOfController = async (req, res) => {
    try {
        const userId = req.user;
        const workspaces = await getWorkspacesTheUserIsPartOfService(userId);
        return res.status(StatusCodes.OK).json({
            success: true,
            data: workspaces,
            message: "Workspaces fetched successfully"
        });
    } catch (error) {
        console.error("Error in getWorkspacesTheUserIsPartOfController:", error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerErrorResponse(error));
    }
}

export const deleteWorkspaceController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const userId = req.user;
        await deleteWorkspaceService(workspaceId, userId);
        return res.status(StatusCodes.OK).json({
            success: true,
            data: {},
            message: "Workspace deleted successfully"
        });
    } catch (error) {
        console.error("Error in deleteWorkspaceController:", error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerErrorResponse(error));
    }
}