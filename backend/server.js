import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import connectDB from './DB/db.js'
import authRoute from "./Routers/router.js"
import cookieParser from "cookie-parser";
import packageRoutes from "./Routers/packageRoutes.js"
import tripRoutes from "./Routers/tripRoutes.js"
import myPlanRoutes from "./Routers/myPlanRoutes.js"

const app=express()
dotenv.config()
app.use(cookieParser());


app.use(
  cors({
    origin: ["https://sport-voyage.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json())

const PORT=process.env.PORT || 5009

connectDB()

app.use('/api/auth',authRoute)
app.use("/api/packages", packageRoutes);
app.use("/api", tripRoutes);
app.use("/api/myPlan", myPlanRoutes);


app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})
