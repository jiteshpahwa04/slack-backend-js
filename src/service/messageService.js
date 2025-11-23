import { StatusCodes } from "http-status-codes";

import channelRepository from "../repositories/channelRepository.js";
import messageRepository from "../repositories/messageRepository.js";
import ClientError from "../utils/errors/clientError.js";
import { isUserMemberOfWorkspace } from "./workspaceService.js";

export const getMessagesService = async (messageParams, page, limit) => {
    const channelId = messageParams.channelId;
    if (!channelId) {
        throw new ClientError({
            message: 'Channel not found',
            explanation: `No channel found with ID: ${channelId}`,
            statusCode: StatusCodes.NOT_FOUND
        });
    }

    const channel = await channelRepository.getChannelWithWorkspaceDetails(channelId);
    if (!channel) {
        throw new ClientError({
            message: 'Channel not found',
            explanation: `No channel found with ID: ${channelId}`,
            statusCode: StatusCodes.NOT_FOUND
        });
    }

    if (!channel.workspaceId) {
        throw new ClientError({
            message: 'Workspace not found',
            explanation: `No workspace found for channel with ID: ${channelId}`,
            statusCode: StatusCodes.NOT_FOUND
        });
    }

    if (!isUserMemberOfWorkspace(channel.workspaceId, messageParams.requestingUserId)) {
        throw new ClientError({
            message: 'Access denied',
            explanation: `User with ID: ${messageParams.requestingUserId} is not a member of workspace with ID: ${channel.workspaceId}`,
            statusCode: StatusCodes.FORBIDDEN
        });
    }

    const messages = await messageRepository.getPaginatedMessages(messageParams, page, limit);
    return messages;
}

export const createMessageService = async (message) => {
    if (!message.channelId) {
        throw new ClientError({
            message: 'Channel ID is required to create a message',
            explanation: 'No channel ID provided in the message object',
            statusCode: StatusCodes.BAD_REQUEST
        });
    }

    const createdMessage = await messageRepository.create(message);
    return createdMessage;
}