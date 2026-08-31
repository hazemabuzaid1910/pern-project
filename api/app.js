import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import ProductRouters from "./routers/ProductRouters.js";
import AuthRouters from "./routers/AuthRouters.js";
const app = express();

app.use(express.json());

app.use(cors());

app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Server is running successfully!");
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "API is working"
    });
});

app.use("/api", ProductRouters);
app.use("/api/auth", AuthRouters);
export default app;