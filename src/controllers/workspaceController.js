import { StatusCodes } from "http-status-codes";

import { addChannelToWorkspaceService, addMemberToWorkspaceService, createWorkspaceService, deleteWorkspaceService, getWorkspaceByJoinCodeService, getWorkspaceService, getWorkspacesTheUserIsPartOfService, updateWorkspaceService } from "../service/workspaceService.js";
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

export const getWorkspaceDetailsController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const userId = req.user;
        const workspace = await getWorkspaceService(workspaceId, userId);
        return res.status(StatusCodes.OK).json({
            success: true,
            data: workspace,
            message: "Workspace details fetched successfully"
        });
    } catch (error) {
        console.error("Error in getWorkspaceDetailsController:", error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerErrorResponse(error));
    }
}

export const getWorkspaceByJoinCodeController = async (req, res) => {
    try {
        const joinCode = req.params.joinCode;
        const workspace = await getWorkspaceByJoinCodeService(joinCode);
        return res.status(StatusCodes.OK).json({
            success: true,
            data: workspace,
            message: "Workspace fetched successfully"
        });
    } catch (error) {
        console.error("Error in getWorkspaceByJoinCodeController:", error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerErrorResponse(error));
    }
}

export const updateWorkspaceController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const updateData = {
            ...req.body,
            requestedBy: req.user
        };
        const updatedWorkspace = await updateWorkspaceService(workspaceId, updateData);
        return res.status(StatusCodes.OK).json({
            success: true,
            data: updatedWorkspace,
            message: "Workspace updated successfully"
        });
    } catch (error) {
        console.error("Error in updateWorkspaceController:", error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerErrorResponse(error));
    }
}

export const addMemberToWorkspaceController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const { memberId, role } = req.body;
        const requestedBy = req.user;
        const updatedWorkspace = await addMemberToWorkspaceService(workspaceId, memberId, role, requestedBy);
        return res.status(StatusCodes.OK).json({
            success: true,
            data: updatedWorkspace,
            message: "Member added to workspace successfully"
        });
    } catch (error) {
        console.error("Error in addMemberToWorkspaceController:", error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerErrorResponse(error));
    }
}

export const addChannelToWorkspaceController = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const channelData = req.body;
        const requestedBy = req.user;
        const updatedWorkspace = await addChannelToWorkspaceService(workspaceId, channelData, requestedBy);
        return res.status(StatusCodes.OK).json({
            success: true,
            data: updatedWorkspace,
            message: "Channel added to workspace successfully"
        });
    } catch (error) {
        console.error("Error in addChannelToWorkspaceController:", error);
        if (error.statusCode) {
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerErrorResponse(error));
    }
}