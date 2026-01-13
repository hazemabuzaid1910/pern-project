import express from "express";
import helmet, { contentSecurityPolicy } from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import ProductRouters from "./routers/ProductRouters.js";
import { aj } from "./lib/arject.js"
import path from "path"
const __dirname = path.resolve()
dotenv.config()
const app = express();
app.use(express.json());
app.use(cors())
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

app.use(async(req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ status: "error", message: "Too many requests" });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ status: "error", message: "Bots are not allowed" });
            } else {
                return res.status(403).json({ status: "error", message: "Access denied" });
            }
        }

        if ((decision.result || []).some((result) => result.reason?.isBot?.() && result.reason?.isSpoofed?.())) {
            return res.status(403).json({ status: "error", message: "Spoofed bots are not allowed" });
        }

        
        next();
    } catch (error) {
        console.log("Error in Arcjet middleware", error);
        next(error);
    }
});

app.use('/api/products', ProductRouters);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}
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
    );
    `;
        console.log('Database initialized');
    } catch (error) {
        console.log('Error initDB', error)
    }
}
initDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port ', PORT);
    });
})