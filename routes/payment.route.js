import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { stripePayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/upgrade", protect, stripePayment);

export default router;
