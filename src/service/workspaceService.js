import {v4 as uuidv4} from "uuid";

import workspaceRepository from "../repositories/workspaceRepository.js"
import channelRepository from "../repositories/channelRepository.js";
import ClientError from "../utils/errors/clientError.js";
import userRepository from "../repositories/userRepository.js";

const isUserAdminOfWorkspace = (workspace, userId) => {
    return workspace.members.some((member) => 
        (member.memberId.toString() === userId || member.memberId._id.toString() === userId) && member.role === 'admin'
    );
}

const isUserMemberOfWorkspace = (workspace, userId) => {
    return workspace.members.some((member) => 
        (member.memberId.toString() === userId || member.memberId._id.toString() === userId)
    );
}

const isChannelExistsInWorkspace = (workspace, channelName) => {
    return workspace.channels.some((channel) => 
        channel.name === channelName
    );
}

export const createWorkspaceService = async (workspaceData) => {
    const joinCode = uuidv4().substring(0, 6);
    
    const response = await workspaceRepository.create({
        name: workspaceData.name,
        description: workspaceData.description, 
        joinCode 
    });

    await workspaceRepository.addMemberToWorkspace(
        response._id,
        workspaceData.owner,
        'admin'
    );

    const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(
        response._id,
        { name: 'general', description: 'General channel' }
    );

    return updatedWorkspace;
}

export const getWorkspacesTheUserIsPartOfService = async (userId) => {
    const workspaces = await workspaceRepository.fetchAllWorkspacesOfUser(userId);
    return workspaces;
}

export const deleteWorkspaceService = async (workspaceId, userId) => {
    const workspace = await workspaceRepository.getById(workspaceId);
    if (!workspace) {
        throw new ClientError({
            message: 'Workspace not found',
            explanation: `No workspace found with ID: ${workspaceId}`,
            statusCode: 404
        });
    }

    const isAllowed = isUserAdminOfWorkspace(workspace, userId);

    if (!isAllowed) {
        throw new ClientError({
            message: 'Forbidden',
            explanation: 'Only admins can delete the workspace',
            statusCode: 403
        });
    }

    const channelDeleteResponse = await channelRepository.deleteByWorkspaceId(workspaceId);
    const workspaceDeleteResponse = await workspaceRepository.delete(workspaceId);

    return {
        workspaceDeleteResponse,
        channelDeleteResponse
    };
}

export const getWorkspaceService = async (workspaceId, userId) => {
    const workspace = await workspaceRepository.getById(workspaceId);
    if (!workspace) {
        throw new ClientError({
            message: 'Workspace not found',
            explanation: `No workspace found with ID: ${workspaceId}`,
            statusCode: 404
        });
    }

    const isAllowed = isUserMemberOfWorkspace(workspace, userId);

    if (!isAllowed) {
        throw new ClientError({
            message: 'Forbidden',
            explanation: 'Only members can access the workspace',
            statusCode: 403
        });
    }

    return workspace;
}

export const getWorkspaceByJoinCodeService = async (joinCode) => {
    const workspace = await workspaceRepository.getWorkspaceByJoinCode(joinCode);
    if (!workspace) {
        throw new ClientError({
            message: 'Workspace not found',
            explanation: `No workspace found with join code: ${joinCode}`,
            statusCode: 404
        });
    }

    return workspace;
}

export const updateWorkspaceService = async (workspaceId, updateData) => {
    const workspace = await workspaceRepository.getById(workspaceId);
    if (!workspace) {
        throw new ClientError({
            message: 'Workspace not found',
            explanation: `No workspace found with ID: ${workspaceId}`,
            statusCode: 404
        });
    }

    if(!isUserAdminOfWorkspace(workspace, updateData.requestedBy)) {
        throw new ClientError({
            message: 'Forbidden',
            explanation: 'Only admins can update the workspace',
            statusCode: 403
        });
    }

    const updatedWorkspace = await workspaceRepository.update(workspaceId, updateData);
    return updatedWorkspace;
}

export const addMemberToWorkspaceService = async (workspaceId, memberId, role, requestedBy) => {
    const workspace = await workspaceRepository.getById(workspaceId);
    if (!workspace) {
        throw new ClientError({
            message: 'Workspace not found',
            explanation: `No workspace found with ID: ${workspaceId}`,
            statusCode: 404
        });
    }

    if(!isUserAdminOfWorkspace(workspace, requestedBy)) {
        throw new ClientError({
            message: 'Forbidden',
            explanation: 'Only admins can add members to the workspace',
            statusCode: 403
        });
    }

    const isValidUser = await userRepository.getById(memberId);
    if (!isValidUser) {
        throw new ClientError({
            message: 'User not found',
            explanation: `No user found with ID: ${memberId}`,
            statusCode: 404
        });
    }

    if(isUserMemberOfWorkspace(workspace, memberId)) {
        throw new ClientError({
            message: 'Conflict',
            explanation: 'User is already a member of the workspace',
            statusCode: 409
        });
    }

    const updatedWorkspace = await workspaceRepository.addMemberToWorkspace(workspaceId, memberId, role);
    return updatedWorkspace;
}

export const addChannelToWorkspaceService = async (workspaceId, channelData, requestedBy) => {
    const workspace = await workspaceRepository.getWorkspaceDetailsById(workspaceId);
    if (!workspace) {
        throw new ClientError({
            message: 'Workspace not found',
            explanation: `No workspace found with ID: ${workspaceId}`,
            statusCode: 404
        });
    }

    if(!isUserAdminOfWorkspace(workspace, requestedBy)) {
        throw new ClientError({
            message: 'Forbidden',
            explanation: 'Only admins can add channels to the workspace',
            statusCode: 403
        });
    }

    if(isChannelExistsInWorkspace(workspace, channelData.name)) {
        throw new ClientError({
            message: 'Conflict',
            explanation: 'Channel with the same name already exists in the workspace',
            statusCode: 409
        });
    }

    const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(workspaceId, channelData);
    return updatedWorkspace;
}