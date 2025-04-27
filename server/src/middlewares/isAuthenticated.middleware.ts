import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/app.config";
import { verifyToken } from "../utils/jwt";
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
    return; // important! stop execution here
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token, config.JWT_SECRET);

    if (!decoded) {
      res
        .status(HTTPSTATUS.UNAUTHORIZED)
        .json({ message: "Unauthorized: Invalid token" });
      return; // stop execution if decoded is null
    }

    // console.log(decoded.role, decoded.userId);

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next(); // ✅ continue to next middleware
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    return; // again important
  }
};
