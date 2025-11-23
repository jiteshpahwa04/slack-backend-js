import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

import userRepository from "../repositories/userRepository.js";
import { createJWT } from "../utils/common/authUtils.js";
import ClientError from "../utils/errors/ClientError.js";
import ValidationError from "../utils/errors/ValidationError.js";

export const singupService = async (userData) => {
    try {
        const newUser = await userRepository.create(userData);
        return newUser;
    } catch (error) {
        console.error("Error in singupService:", error);
        if (error.name === 'ValidationError') {
            throw new ValidationError(
                {
                    error: error.errors
                }
                , "User data validation failed during signup.");
        }
        if (error.name === 'MongoServerError' && error.code === 11000) {
            throw new ValidationError({
                error: ['A user with same email or username already exists.']
            },
                "Duplicate user data error during signup.");
        }
    }
}

export const signinService = async (credentials) => {
    try {
        const user = await userRepository.getByEmail(credentials.email);
        if (!user) {
            throw new ClientError({
                explanation: ['No user found with the provided email.'],
                message: 'No registered user found with this email',
                statusCode: StatusCodes.NOT_FOUND
            });
        }

        // match the incoming password with the stored password
        const isMatch = bcrypt.compareSync(credentials.password, user.password);
        if (!isMatch) {
            throw new ClientError({
                explanation: ['The password you entered is incorrect.'],
                message: 'Incorrect password',
                statusCode: StatusCodes.BAD_REQUEST
            });
        }

        // create and send back the token
        return {
            username: user.username,
            avatar: user.avatar,
            email: user.email,
            token: createJWT({ id: user._id, email: user.email })
        };
    } catch (error) {
        console.error("Error in signinService:", error);
    }
}