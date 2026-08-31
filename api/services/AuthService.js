import bcrypt from "bcrypt";
import * as userRepository from "../repositories/UserRepository.js";
import jwt from "jsonwebtoken";
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
    console.log("1. Login started");
    console.log("Email:", email);
    console.log("Password received:", !!password);

    const users = await userRepository.findUserByEmail(email);

    console.log("2. Users result:", users);
    console.log("3. Users count:", users.length);

    if (users.length === 0) {
        throw new Error("Invalid email or password");
    }

    const user = users[0];

    console.log("4. User found:", {
        id: user.id,
        email: user.email,
        hasPasswordHash: !!user.password_hash
    });

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
    );

    console.log("5. Password valid:", isPasswordValid);

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    console.log("6. JWT_SECRET exists:", !!process.env.JWT_SECRET);

    const token = jwt.sign({
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET, {
            expiresIn: "1d"
        }
    );

    console.log("7. Token generated successfully");

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token
    };
};