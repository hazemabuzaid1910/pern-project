import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    // هذا الجزء هو الحل لمشكلة "connection is insecure"
    ssl: {
        rejectUnauthorized: false // يسمح بالاتصال المشفر مع الشهادات الموقعة ذاتياً
    }
});

export const sql = async(strings, ...values) => {
    let text = strings[0];
    for (let i = 0; i < values.length; i++) {
        text += `$${i + 1}` + strings[i + 1];
    }

    try {
        const result = await pool.query(text, values);
        return result.rows;
    } catch (error) {
        console.error("Database Query Error:", error);
        throw error; // رمي الخطأ ليتم التقاطه في الـ Controller
    }
};

export { pool };