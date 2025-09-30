import { Router } from "express";
import {
  addAndRemoveProductsToCartController,
  deleteCartItemController,
  getAllCartItemsController,
} from "../controllers/cart.controller";

const cartRoutes = Router();

cartRoutes.post(`/addToCart`, addAndRemoveProductsToCartController);

cartRoutes.get(`/getAllCartItems`, getAllCartItemsController);

cartRoutes.delete(`/deleteCartItem/:productId`, deleteCartItemController);

export default cartRoutes;
