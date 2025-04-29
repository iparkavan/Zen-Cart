import { Router } from "express";
import {
  createProductController,
  getAllProductsController,
  updateProductController,
} from "../controllers/product.controller";
import { checkPermission } from "../middlewares/check-permission.middleware";
import { RolePermissions } from "../utils/roles-permissions";
import { Permissions } from "../enums/role.enum";
import { validateSeller } from "../middlewares/validateSeller.middleware";

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

productRoutes.get(`/all`, getAllProductsController);

export default productRoutes;
