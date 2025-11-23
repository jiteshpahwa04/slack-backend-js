import express from 'express';

import { isUserPartOfWorkspaceController } from '../../controllers/memberController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
const memberRouter = express.Router();

memberRouter.get('/workspace/:workspaceId', isAuthenticated, isUserPartOfWorkspaceController);

export default memberRouter;