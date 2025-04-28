// src/middlewares/isAuthenticated.middleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { config } from "../config/app.config";
import { HTTPSTATUS } from "../config/http.config";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(HTTPSTATUS.UNAUTHORIZED)
      .json({ message: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token, config.JWT_SECRET);

    if (!decoded || typeof decoded !== "object") {
      res
        .status(HTTPSTATUS.UNAUTHORIZED)
        .json({ message: "Unauthorized: Invalid token" });
      return;
    }

    req.user = {
      userId: (decoded as any).userId,
      role: (decoded as any).role,
    };

    next(); // ✅ allow to proceed
  } catch (error) {
    res
      .status(HTTPSTATUS.UNAUTHORIZED)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};
