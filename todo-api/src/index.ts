import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import UserRoutes from "./routes/user.routes";

dotenv.config();

const app: Application = express();

if (!process.env.MONGODB) {
  console.error("MONGODB URI is missing in the environment variables.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("MongoDB is connected!"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

const corsOptions = {
  origin: process.env.URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"],
  allowedHeaders: "Authorization, Content-Type",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

app.use("/api", UserRoutes);

app.listen(PORT, () => {
  console.log(`Server Running at localhost:8080`);
});
