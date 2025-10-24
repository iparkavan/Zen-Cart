import { count } from "console";
import { ExpressHandler } from "../@types/express.types";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  getAllCategoryService,
  getCategoryByIdService,
  getFilterByCategoryService,
} from "../services/category.service";

export const getAllCategoryController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    const { categories } = await getAllCategoryService();

    return res.status(HTTPSTATUS.OK).json({
      message: "Categories fetched successfully",
      categories,
    });
  }
);

export const getFilterByCategoryController: ExpressHandler = asyncHandler(
  async (req, res) => {
    const category = req.query.category as string;

    if (!category) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "Missing 'category' query parameter",
      });
    }

    const { products } = await getFilterByCategoryService(category);

    return res.status(HTTPSTATUS.OK).json({
      message: "Products fetched successfully",
      products,
    });
  }
);

export const getCategoryByIdController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    const { categoryId } = req.params;
    console.log("categoryId:", categoryId);

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
