import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";
dotenv.config();

const port = process.env.PORT;

const app = express();
import cors from "cors";

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true // Allow cookies to be sent
}));
app.use(cookieParser());
app.use("/auth", proxy(process.env.AUTH_SERVICE));
app.get("/",(req,res)=>{
    res.json({message : "hello"})
})
app.listen(port,()=>{
    console.log(`GATEWAY STARTED ${port}`);
})

