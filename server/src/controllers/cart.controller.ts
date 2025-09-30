import { ExpressHandler } from "../@types/express.types";
import { HTTPSTATUS } from "../config/http.config";
import {
  addAndRemoveProductsToCartSevice,
  deleteCartItemService,
  getAllCartItemsService,
} from "../services/cart.service";
import { checkUserId } from "../utils/check-current-user";
import { addToCartSchema } from "../validations/cart.validations.schema";

export const addAndRemoveProductsToCartController: ExpressHandler = async (
  req,
  res,
  next
) => {
  const body = addToCartSchema.parse({ ...req.body });

  const userId = req.user?.userId;

  if (!userId) {
    return res.status(HTTPSTATUS.UNAUTHORIZED).json({
      message: "Unauthorized access",
    });
  }

  const { cartItems } = await addAndRemoveProductsToCartSevice(userId, body);

  return res.status(HTTPSTATUS.OK).json({
    message: "Product added to cart successfully",
    // cartItems,
  });
};

export const getAllCartItemsController: ExpressHandler = async (
  req,
  res,
  next
) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(HTTPSTATUS.UNAUTHORIZED).json({
      message: "Unauthorized access",
    });
  }

  const { cartItems } = await getAllCartItemsService(userId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Cart items fetched successfully",
    cartItems,
  });
};

export const deleteCartItemController: ExpressHandler = async (
  req,
  res,
  next
) => {
  const { productId } = req.params;
  // const { productId } = req.body;
  const userId = req.user?.userId;

  checkUserId(userId);

  await deleteCartItemService(userId!!, productId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Cart item deleted successfully",
  });
};
