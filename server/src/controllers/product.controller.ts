import { ExpressHandler } from "../@types/express.types";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createProductService,
  getAllProductsService,
} from "../services/product.service";
import { createProductSchema } from "../validations/product.validations.schema";

export const createProductController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    if (!req.user) {
      return res.status(HTTPSTATUS.UNAUTHORIZED).json({
        message: "User not authenticated",
      });
    }

    // const { userId } = req?.user;

    const body = createProductSchema.parse({ ...req.body });

    const { product } = await createProductService(body);

    res.status(HTTPSTATUS.CREATED).json({
      message: "Product created successfully",
      product,
    });
  }
);

export const getAllProductsController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { products, totalCount, totalPages, skip } =
      await getAllProductsService({
        page,
        limit,
      });

    res.status(HTTPSTATUS.OK).json({
      message: "Products fetched successfully",
      products,
      pagination: {
        totalCount,
        limit,
        page,
        totalPages,
        skip,
      },
    });
  }
);
