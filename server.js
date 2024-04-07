import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./db/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

//Importing Routes
import userRoutes from "./routes/user.router.js";
import genAiRoute from "./routes/geminiai.router.js";
import paymentRoutes from "./routes/payment.route.js";

connectDb(); //Database
const port = process.env.PORT || 6000;
//Express Initialized
const app = express();
//Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());

//Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/ai", genAiRoute);
app.use("/api/v1/payment", paymentRoutes);

//Main route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to AI Content Genrator Server" });
});

//Middlewares-Custom
app.use(notFound);
app.use(errorHandler);

//Server Start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
