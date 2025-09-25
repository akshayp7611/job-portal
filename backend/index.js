import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "https://job-portal-frontend-three-zeta.vercel.app/", credentials: true }));

// Lazy DB connection middleware
let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
      console.log("MongoDB connected.");
    } catch (error) {
      console.error("MongoDB connection failed:", error);
      return res.status(500).json({ error: "Database connection failed" });
    }
  }
  next();
});

// Routes
app.get("/",(req,res)=>{
res.send("Api working........");
})
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.get("/", (req, res) => {
  res.send("Welcome to Job Portal API");
});

export default serverless(app);
