import express from 'express';

import { addChannelToWorkspaceController, addMemberToWorkspaceController, createWorkspaceController, deleteWorkspaceController, getWorkspaceByJoinCodeController, getWorkspaceDetailsController, getWorkspacesTheUserIsPartOfController, updateWorkspaceController } from '../../controllers/workspaceController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { addChannelToWorkspaceSchema, addMemberToWorkspaceSchema, createWorkspaceSchema } from '../../validators/workspaceSchmea.js';
import { validate } from '../../validators/zodValidator.js';

const workspaceRouter = express.Router();

workspaceRouter.post('/', isAuthenticated, validate(createWorkspaceSchema), createWorkspaceController);
workspaceRouter.get('/', isAuthenticated, getWorkspacesTheUserIsPartOfController);
workspaceRouter.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController);
workspaceRouter.get('/:workspaceId', isAuthenticated, getWorkspaceDetailsController);
workspaceRouter.get('/joinCode/:joinCode', isAuthenticated, getWorkspaceByJoinCodeController);
workspaceRouter.put('/:workspaceId', isAuthenticated, updateWorkspaceController);
workspaceRouter.post('/:workspaceId/members', isAuthenticated, validate(addMemberToWorkspaceSchema), addMemberToWorkspaceController);
workspaceRouter.post('/:workspaceId/channels', isAuthenticated, validate(addChannelToWorkspaceSchema), addChannelToWorkspaceController);

export default workspaceRouter;