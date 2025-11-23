import { SMTP_EMAIL } from "../../config/serverConfig.js";

export const workspaceJoinMail = (workspace) => {
    return {
        from: SMTP_EMAIL,
        subject: `Welcome to ${workspace.name} Workspace`,
        body: `You have been added to the workspace: ${workspace.name}`
    }
};