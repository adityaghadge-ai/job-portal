import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

dotenv.config({});
const app=express();
app.use(express.json());

app.use(cookieParser());
const corsOptions={
    origin:'http://localhost:5173',
    credentials:true,
}

app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    connectDB();
    console.log(`server running on ${PORT}`);
})