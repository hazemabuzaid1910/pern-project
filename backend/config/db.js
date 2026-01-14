import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

export const sql = async (strings, ...values) => {
    let text = strings[0];
    for (let i = 0; i < values.length; i++) {
        text += `$${i + 1}` + strings[i + 1];
    }
    
    const result = await pool.query(text, values);
    return result.rows;
};

export { pool };
