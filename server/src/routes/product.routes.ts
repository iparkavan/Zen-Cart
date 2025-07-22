import { Router } from "express";
import {
  createProductController,
  deleteProductByIdController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from "../controllers/product.controller";
import { checkPermission } from "../middlewares/check-permission.middleware";
import { Permissions } from "../enums/role.enum";

const productRoutes = Router();

productRoutes.post(
  `/create`,
  checkPermission([Permissions.CREATE_PRODUCT]),
  createProductController
);

productRoutes.put(
  "/:productId",
  checkPermission([Permissions.EDIT_PRODUCT]),
  updateProductController
);

productRoutes.get(
  `/all`,
  // checkPermission([Permissions.VIEW_PRODUCTS]),
  getAllProductsController
);

productRoutes.get(
  `/:productId`,
  checkPermission([Permissions.VIEW_PRODUCTS]),
  getProductByIdController
);

productRoutes.delete(
  `/delete/:productId`,
  checkPermission([Permissions.DELETE_PRODUCT]),
  deleteProductByIdController
);

export default productRoutes;
