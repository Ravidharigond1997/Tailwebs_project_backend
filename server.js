import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";

import { connectDB } from './config/dbConnect.js';
import userRoutes from "./routers/userRouter.js";
import assignmentRoutes from "./routers/assignmentRouter.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/api/auth", userRoutes)
app.use("/api/assignments", assignmentRoutes)

app.get("/", async(req, res) => {
    try{
       res.status(200).json({
        message:"Server running successfully"
       })
    }catch(err){
       res.json(500).json({
        message:err.message
       })
    }
});

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
});
