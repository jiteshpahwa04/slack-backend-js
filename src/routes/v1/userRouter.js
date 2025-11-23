import express from 'express';

import { signinController, signupController } from '../../controllers/userController.js';
import { userSigninSchema, userSignupSchema } from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidator.js';
const userRouter = express.Router();

userRouter.post('/signup', validate(userSignupSchema), signupController);
userRouter.post('/signin', validate(userSigninSchema), signinController);

export default userRouter;