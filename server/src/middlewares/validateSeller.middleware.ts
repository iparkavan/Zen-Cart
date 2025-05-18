import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import { HTTPSTATUS } from "../config/http.config";
import { Roles } from "../enums/role.enum";

export const validateSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(HTTPSTATUS.UNAUTHORIZED).json({
        message: "User not authenticated",
      });
      return;
    }

    const { userId: sellerId } = req.user;

    const seller = await UserModel.findById(sellerId).populate("role");

    if (!seller) {
      res
        .status(HTTPSTATUS.NOT_FOUND)
        .json({ success: false, message: "Seller not found" });
      return;
    }

    if (seller.role.name !== Roles.SELLER) {
      res
        .status(HTTPSTATUS.FORBIDDEN)
        .json({ success: false, message: "Provided user is not a seller" });
      return;
    }

    next();
  } catch (error) {
    console.error("Error in validateSeller middleware:", error);
    res
      .status(HTTPSTATUS.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Server Error" });
  }
};
