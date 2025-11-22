import userRepository from "../repositories/userRepository.js";
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