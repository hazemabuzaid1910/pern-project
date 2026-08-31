import { sql } from "../config/db.js";

export const createUser = async(name, email, passwordHash) => {
    return await sql `
        INSERT INTO users (name, email, password_hash)
        VALUES (${name}, ${email}, ${passwordHash})
        RETURNING id, name, email, created_at
    `;
};

export const findUserByEmail = async(email) => {
    return await sql `
        SELECT *
        FROM users
        WHERE email = ${email}
    `;
};