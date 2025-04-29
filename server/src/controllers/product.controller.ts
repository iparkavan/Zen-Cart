import { ExpressHandler } from "../@types/express.types";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { createProductService } from "../services/product.service";
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
