import { StatusCodes } from "http-status-codes";

import User from "../schema/user.js";
import Workspace from "../schema/workspace.js";
import ClientError  from "../utils/errors/clientError.js";
import channelRepository from "./channelRepository.js";
import crudRepository from "./crudRepository.js";

const workspaceRepository = {
    ...crudRepository(Workspace),
    getWorkspaceByName: async function (workspaceName) {
        const workspace = await Workspace.findOne({ name: workspaceName });
        if (!workspace) {
            throw new ClientError({
                message: 'Workspace not found',
                explanation: `No workspace found with name: ${workspaceName}`,
                statusCode: StatusCodes.NOT_FOUND
            });
        }

        return workspace;
    },
    getWorkspaceByJoinCode: async function (joinCode) {
        const workspace = await Workspace.findOne({ joinCode: joinCode });
        if (!workspace) {
            throw new ClientError({
                message: 'Workspace not found',
                explanation: `No workspace found with join code: ${joinCode}`,
                statusCode: StatusCodes.NOT_FOUND
            });
        }

        return workspace;
    },
    addChannelToWorkspace: async function (workspaceId, channel) {
        const workspace = await Workspace.findById(workspaceId).populate('channels');
        if (!workspace) {
            throw new ClientError({
                message: 'Workspace not found',
                explanation: `No workspace found with ID: ${workspaceId}`,
                statusCode: StatusCodes.NOT_FOUND
            });
        }

        const channelExists = workspace.channels.find((ch) => ch.name === channel.name);
        if (channelExists) {
            throw new ClientError({
                message: 'Channel already exists',
                explanation: `Channel with name: ${channel.name} already exists in the workspace`,
                statusCode: StatusCodes.CONFLICT
            });
        }

        const newChannel = await channelRepository.create(channel);

        workspace.channels.push(newChannel);
        await workspace.save();
        return workspace;
    },
    addMemberToWorkspace: async function (workspaceId, memberId, role) {
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            throw new ClientError({
                message: 'Workspace not found',
                explanation: `No workspace found with ID: ${workspaceId}`,
                statusCode: StatusCodes.NOT_FOUND
            });
        }

        const isValidUser = await User.findById(memberId);
        if (!isValidUser) {
            throw new ClientError({
                message: 'User not found',
                explanation: `No user found with ID: ${memberId}`,
                statusCode: StatusCodes.NOT_FOUND
            });
        }

        const memberExists = workspace.members.some(member => member.memberId.toString() === memberId);
        if (memberExists) {
            throw new ClientError({
                message: 'Member already exists',
                explanation: `Member with ID: ${memberId} already exists in the workspace`,
                statusCode: StatusCodes.CONFLICT
            });
        }

        workspace.members.push({ memberId, role });
        await workspace.save();
        return workspace;
    },
    fetchAllWorkspacesOfUser: async function (userId) {
        const workspaces = await Workspace.find(
            {
                'members.memberId': userId
            }
        ).populate('members.memberId', 'username email avatar');

        return workspaces;
    }
};

export default workspaceRepository;