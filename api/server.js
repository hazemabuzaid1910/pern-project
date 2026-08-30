import dotenv from "dotenv";
import app from "./app.js";
import { sql } from "./config/db.js";

dotenv.config();

async function initDB() {
    try {
        await sql `
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                image VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        console.log("Database initialized");

    } catch (error) {
        console.log("Error initDB", error);
    }
}

await initDB();

export default app;