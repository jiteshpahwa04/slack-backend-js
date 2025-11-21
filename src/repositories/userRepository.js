import User from "../schema/user.js";
import crudRepository from "./crudRepository.js";

const userRepository = {
    ...crudRepository(User),
    getByEmail: async function (email) {
        const user = await this.findOne({ email });
        return user;
    },
    getByUsername: async function (username) {
        const user = await this.findOne({ username }).select('-password'); // Exclude password field
        return user;
    }
}

export default userRepository;