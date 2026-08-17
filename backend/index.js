import "dotenv/config";

import express from "express";
import { connectDB } from "./db/connectDB.js";
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL, 
    credentials: true
}))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

const port = process.env.BACKEND_PORT || 4000;
connectDB();

app.use("/api/auth", authRouter);

app.listen(port, () => {
    console.log(`The server is listening at http://localhost:${port}/`)
})
