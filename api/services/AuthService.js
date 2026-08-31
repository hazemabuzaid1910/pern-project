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
export const login = async(email, password) => {
    const users = await userRepository.findUserByEmail(email);

    if (users.length === 0) {
        throw new Error("Invalid email or password");
    }


    const user = users[0];

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign({
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET, {
            expiresIn: "1d"
        }
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token
    };
};