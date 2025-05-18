import { count } from "console";
import { ExpressHandler } from "../@types/express.types";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  getAllCategoryService,
  getCategoryByIdService,
} from "../services/category.service";

export const getCategoryByIdController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "Category id is required",
      });
    }

    const { products } = await getCategoryByIdService(categoryId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Product fetched successfully",
      count: products.length,
      products,
    });
  }
);

export const getAllCategoryController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    const { categories } = await getAllCategoryService();

    return res.status(HTTPSTATUS.OK).json({
      message: "Categories fetched successfully",
      categories,
    });
  }
);
