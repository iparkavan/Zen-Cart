import { Router } from "express";
import {
  googleLoginCallback,
  isEmailExistController,
  loginController,
  logoutController,
  registerAsCustomerController,
  registerAsSellerController,
} from "../controllers/auth.controller";
import passport from "passport";
import { config } from "../config/app.config";

const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;

const authRoutes = Router();

// Route for initiating Google login
authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Google callback route
authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: failedUrl,
  }),
  googleLoginCallback
);

authRoutes.post(`/login`, loginController);

authRoutes.post(`/logout`, logoutController);

authRoutes.post("/verify-email", isEmailExistController);

authRoutes.post("/customer-registration", registerAsCustomerController);

// authRoutes.post("/customer-additional-info", CustomerAdditionalInfoController);

authRoutes.post("/seller-registration", registerAsSellerController);

export default authRoutes;
