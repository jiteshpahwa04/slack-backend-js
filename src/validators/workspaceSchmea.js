import z from "zod";

export const createWorkspaceSchema = z.object({
    name: z.string().min(1, 'Workspace name is required'),
    description: z.string().optional()
});

export const addMemberToWorkspaceSchema = z.object({
    memberId: z.string().min(1, 'Member ID is required')
});

export const addChannelToWorkspaceSchema = z.object({
    name: z.string().min(1, 'Channel name is required')
});