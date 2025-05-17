import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import dialogflow from "./Routers/dialogflow.js";

dotenv.config({ path: "./config/config.env" });

const app = express();
const port = process.env.PORT || 5000;

// Kết nối MongoDB
connectDB();

// Cấu hình CORS
const allowedOrigins = [
  "https://main.d1sj7cd70hlter.amplifyapp.com",
  "https://expense-tracker-app-three-beryl.vercel.app",
  "http://localhost:3000",
  // Add thêm origin nếu deploy nhiều domain khác
];

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing
app.use("/api/v1", transactionRoutes); // Giao dịch
app.use("/api/auth", userRoutes); // Đăng nhập / Đăng ký
app.use("/api", dialogflow); // Dialogflow

// Test endpoint
app.get("/", (req, res) => {
  res.send("🚀 Expense Tracker API is running!");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
