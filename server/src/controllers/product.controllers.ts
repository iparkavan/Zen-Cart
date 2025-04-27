import { ExpressHandler } from "../@types/express.types";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";

export const createProductController: ExpressHandler = asyncHandler(
  async (req, res, next) => {}
);
