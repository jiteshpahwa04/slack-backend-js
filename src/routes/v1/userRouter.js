import express from 'express';

import { signupController } from '../../controllers/userController.js';
import { userSignupSchema } from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidator.js';
const userRouter = express.Router();

userRouter.post('/signup', validate(userSignupSchema), signupController);

export default userRouter;