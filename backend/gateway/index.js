import express from "express";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

const app = express();

app.get("/",(req,res)=>{
    res.json({message : "hello"})
})
app.listen(port,()=>{
    console.log(`GATEWAY STARTED ${port}`);
})

