import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import db from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import { serviceRouter } from "./routes/service.route.js";
import { branchRouter } from "./routes/branch.route.js";
import { siteRouter } from "./routes/site.route.js";
import { staffRouter } from "./routes/staff.route.js";

dotenv.config();

const app = express();

// Connect to database
db.connect()
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log("MySQL connection Failed ", error.message));

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRouter);
app.use("/api/services", serviceRouter);
app.use("/api/branch", branchRouter);
app.use("/api/site", siteRouter);
app.use("/api/staff", staffRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
