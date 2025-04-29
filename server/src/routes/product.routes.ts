import { Router } from "express";
import { createProductController } from "../controllers/product.controller";
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

export default productRoutes;
