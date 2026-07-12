import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/auth.route.js";
dotenv.config(); 

const port = process.env.PORT || 5001; // Fallback port just in case
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(router) 
app.get("/", (req, res) => {
    res.json({ message: "hello from auth" });
});

const startServer = async () => {
    try {
        await connectDB();

        app.listen(port, () => {
            console.log(`AUTH STARTED ON PORT: ${port}`);
        });
    } catch (error) {
        console.error("Failed to start auth service:", error.message);

        if (error.cause) {
            console.error("MongoDB cause:", error.cause);
        }

        process.exit(1);
    }
};

startServer();
