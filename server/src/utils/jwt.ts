import { jwtVerify, SignJWT } from "jose";
// src/utils/jwt.ts
import jwt from "jsonwebtoken";
import { config } from "../config/app.config";

// Define a type for the payload in your JWT token
import type { JWTPayload } from "jose";

export interface JwtPayload extends JWTPayload {
  userId: string;
  role: string;
}

// Utility function to generate a JWT token
export const generateToken = (user: JwtPayload): string => {
  const secretKey = config.JWT_SECRET as string;
  const expiresIn = config.JWT_EXPIRES_IN as unknown as number;
  return jwt.sign(user, secretKey, {
    expiresIn: expiresIn || "1h",
  });
};

// // Utility function to verify a JWT token
export const verifyToken = (
  token: string,
  JWT_SECRET: string
): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string, {
      // algorithms: ["HS256"],
    }) as JwtPayload;
    return decoded as JwtPayload;
  } catch (error) {
    return null;
  }
};
