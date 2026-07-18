import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "../auth/routes/chat.route.js";
dotenv.config(); 

const parsedPort = Number.parseInt(process.env.PORT ?? "", 10);
const port = Number.isFinite(parsedPort) ? parsedPort : 8002; // Fallback port just in case
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", frontendUrl);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

app.use(express.json()); // Middleware to parse JSON bodies
app.use("/", router);
app.get("/", (req, res) => {
    res.json({ message: "hello from chat" });
});

const startServer = async () => {
    try {
        await connectDB();

        app.listen(port, () => {
            console.log(`CHAT STARTED ON PORT: ${port}`);
        });
    } catch (error) {
        console.error("Failed to start chat service:", error.message);

        if (error.cause) {
            console.error("MongoDB cause:", error.cause);
        }

        process.exit(1);
    }
};

startServer();
