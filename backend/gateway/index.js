import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";
import cors from "cors";
import protect from "./middlewares/auth.middleware.js";
import {getCurrentUser} from "./controllers/user.controller.js";
dotenv.config();

// 💡 Fallback to 8000 if process.env.PORT is blank
const port = process.env.PORT || 8000;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
const authServiceUrl = process.env.AUTH_SERVICE || "http://localhost:8001";

const app = express();

app.use(cors({
    origin: frontendUrl,
    credentials: true
}));

app.use(cookieParser());

// Proxy requests to Auth service and strip the /auth prefix.
app.use("/api/auth", proxy(process.env.AUTH_SERVICE || "http://localhost:8001"));
app.get("/api/me",protect,getCurrentUser);
app.get("/", (req, res) => {
    res.json({ message: "hello from gateway" });
});

app.listen(port, () => {
    console.log(`GATEWAY STARTED ON PORT: ${port}`);
    console.log(`Routing /auth to: ${authServiceUrl}`);
});
