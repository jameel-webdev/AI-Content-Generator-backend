import express from "express";
import {
  deleteProfile,
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router
  .route("/")
  .get(protect, getProfile)
  .put(protect, updateProfile)
  .delete(protect, deleteProfile);

export default router;
