import userRepository from "../repositories/userRepository.js";
import workspaceRepository from "../repositories/workspaceRepository.js";
import ClientError from "../utils/errors/clientError.js";
import { isUserMemberOfWorkspace } from "./workspaceService.js";

export const isMemberPartOfWorkspaceService = async (memberId, workspaceId) => {
    const workspace = await workspaceRepository.getById(workspaceId);
    if (!workspace) {
        throw new ClientError({
            message: 'Workspace not found',
            explanation: `No workspace found with ID: ${workspaceId}`,
            statusCode: 404
        });
    }

    const isUserMember = isUserMemberOfWorkspace(workspace, memberId);
    if (!isUserMember) {
        throw new ClientError({
            message: 'Forbidden',
            explanation: `User with ID: ${memberId} is not a member of workspace with ID: ${workspaceId}`,
            statusCode: 403
        });
    }

    return await userRepository.getById(memberId);
}