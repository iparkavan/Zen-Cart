import { ExpressHandler } from "../@types/express.types";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createProductService,
  deleteProductByIdService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from "../services/product.service";
import {
  createProductSchema,
  productIdSchema,
  updateProductSchema,
} from "../validations/product.validations.schema";

export const createProductController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    if (!req.user) {
      return res.status(HTTPSTATUS.UNAUTHORIZED).json({
        message: "User not authenticated",
      });
    }

    const { userId: sellerId } = req?.user;

    const body = createProductSchema.parse({ ...req.body });

    const { product } = await createProductService(body, sellerId);

    res.status(HTTPSTATUS.CREATED).json({
      message: "Product created successfully",
      product,
    });
  }
);

export const updateProductController: ExpressHandler = asyncHandler(
  async (req, res) => {
    if (!req.user) {
      return res.status(HTTPSTATUS.UNAUTHORIZED).json({
        message: "User not authenticated",
      });
    }

    const productId = productIdSchema.parse(req.params.productId);
    const { userId: sellerId } = req.user;

    const body = updateProductSchema.parse(req.body);

    const updatedProduct = await updateProductService(
      productId,
      sellerId,
      body
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Product updated successfully",
      product: updatedProduct,
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

export const getProductByIdController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    const productId = productIdSchema.parse(req.params.productId);

    const { product } = await getProductByIdService(productId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Product fetched successfully",
      product,
    });
  }
);

export const deleteProductByIdController: ExpressHandler = asyncHandler(
  async (req, res, next) => {
    const productId = productIdSchema.parse(req.params.productId);

    await deleteProductByIdService(productId);

    res.status(HTTPSTATUS.OK).json({ message: "Product deleted successfully" });
  }
);
