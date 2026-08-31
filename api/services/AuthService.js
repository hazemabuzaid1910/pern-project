import bcrypt from "bcrypt";
import * as userRepository from "../repositories/UserRepository.js";

export const register = async(name, email, password) => {
    const existingUser = await userRepository.findUserByEmail(email);

    if (existingUser.length > 0) {
        throw new Error("User already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await userRepository.createUser(
        name,
        email,
        passwordHash
    );

    return newUser;
};