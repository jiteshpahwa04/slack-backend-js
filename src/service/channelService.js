import { StatusCodes } from "http-status-codes";

import channelRepository from "../repositories/channelRepository.js";
import messageRepository from "../repositories/messageRepository.js";
import ClientError from "../utils/errors/clientError.js";
import { isUserMemberOfWorkspace } from "./workspaceService.js";

export const getChannelById = async (channelId, requestingUserId) => {
    const channel = await channelRepository.getChannelWithWorkspaceDetails(channelId);
    if (!channel || !channel.workspaceId) {
        throw new ClientError({
            message: 'Channel not found',
            explanation: `No channel found with ID: ${channelId}`,
            statusCode: StatusCodes.NOT_FOUND
        });
    }
    
    if(!isUserMemberOfWorkspace(channel.workspaceId, requestingUserId)) {
        throw new ClientError({
            message: 'Access Denied',
            explanation: 'You are not a member of the workspace containing this channel',
            statusCode: StatusCodes.FORBIDDEN
        });
    }

    const messages = await messageRepository.getPaginatedMessages({channelId}, 1, 50);

    return {messages, channel};
}