const express = require("express");
const cors = require("cors");
const { connectDB } = require("./DB/Database");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const transactionRoutes = require("./Routers/Transactions");
const userRoutes = require("./Routers/userRouter");
const dialogflow = require("./Routers/dialogflow");

dotenv.config({ path: "./config/config.env" });

const app = express();

// Kết nối MongoDB
connectDB();

const allowedOrigins = [
  "https://main.d1sj7cd70hlter.amplifyapp.com",
  "https://expense-tracker-app-three-beryl.vercel.app",
  "http://localhost:3000",
];

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

app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);
app.use("/api", dialogflow);

app.get("/", (req, res) => {
  res.send("🚀 Expense Tracker API is running!");
});

module.exports = app;
