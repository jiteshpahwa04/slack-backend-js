import express from 'express';

import { createWorkspaceController, deleteWorkspaceController, getWorkspacesTheUserIsPartOfController } from '../../controllers/workspaceController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { createWorkspaceSchema } from '../../validators/workspaceSchmea.js';
import { validate } from '../../validators/zodValidator.js';

const workspaceRouter = express.Router();

workspaceRouter.post('/', isAuthenticated, validate(createWorkspaceSchema), createWorkspaceController);
workspaceRouter.get('/', isAuthenticated, getWorkspacesTheUserIsPartOfController);
workspaceRouter.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController);

export default workspaceRouter;