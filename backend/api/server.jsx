import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import ProductRouters from "./routers/ProductRouters.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";


if (process.env.ARCJET_KEY) {
    import ("./lib/arject.js").then(({ aj }) => {
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
    }).catch(err => {
        console.log("Arcjet not configured, skipping rate limiting");
    });
}

app.use('/', ProductRouters);



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
    )`;
        console.log('Database initialized');
    } catch (error) {
        console.log('Error initDB', error);
    }
}
initDB();

export default app;