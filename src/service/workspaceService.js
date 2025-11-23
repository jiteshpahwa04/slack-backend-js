import {v4 as uuidv4} from "uuid";

import workspaceRepository from "../repositories/workspaceRepository.js"
import channelRepository from "../repositories/channelRepository.js";
import ClientError from "../utils/errors/clientError.js";

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

    const isAllowed = workspace.members.find((member) => 
        member.memberId.toString() === userId && member.role === 'admin'
    );

    if (!isAllowed) {
        throw new ClientError({
            message: 'Forbidden',
            explanation: 'Only admins can delete the workspace',
            statusCode: 403
        });
    }

    const channelIds = workspace.channels;

    const channelDeleteResponse = await channelRepository.deleteMany(channelIds);
    const workspaceDeleteResponse = await workspaceRepository.delete(workspaceId);

    return {
        workspaceDeleteResponse,
        channelDeleteResponse
    };
}