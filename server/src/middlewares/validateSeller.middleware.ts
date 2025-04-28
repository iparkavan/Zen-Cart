import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";

export const validateSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sellerId = req.body.sellerId;

    if (!sellerId) {
      return res
        .status(400)
        .json({ success: false, message: "Seller ID is required" });
    }

    const seller = await UserModel.findById(sellerId);

    if (!seller) {
      return res
        .status(404)
        .json({ success: false, message: "Seller not found" });
    }

    if (seller.role !== "seller") {
      return res
        .status(403)
        .json({ success: false, message: "Provided user is not a seller" });
    }

    // ✅ Seller validated, continue
    next();
  } catch (error) {
    console.error("Error in validateSeller middleware:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
