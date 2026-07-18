import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";
import cors from "cors";
import protect from "./middlewares/auth.middleware.js";
import {getCurrentUser} from "./controllers/user.controller.js";
import { proxyWithHeader } from "./utils/proxyWithHeader.js";
dotenv.config();

// Parse the port defensively so a stray character in .env does not break startup.
const parsedPort = Number.parseInt(process.env.PORT ?? "", 10);
const port = Number.isFinite(parsedPort) ? parsedPort : 8000;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
const authServiceUrl = process.env.AUTH_SERVICE || "http://localhost:8001";

const app = express();

app.use(cors({
    origin: frontendUrl,
    credentials: true
}));

app.use(cookieParser());

// Proxy requests to Auth service and strip the /auth prefix.
app.use("/auth", proxy(process.env.AUTH_SERVICE || "http://localhost:8001"));
app.use("/chat",protect, proxyWithHeader(process.env.CHAT_SERVICE || "http://localhost:8002"));
app.use("/agent",protect, proxy(process.env.AGENT_SERVICE || "http://localhost:8003"));
app.get("/me",protect,getCurrentUser);
app.get("/", (req, res) => {
    res.json({ message: "hello from gateway" });
});

app.listen(port, () => {
    console.log(`GATEWAY STARTED ON PORT: ${port}`);
    console.log(`Routing /auth to: ${authServiceUrl}`);
});
