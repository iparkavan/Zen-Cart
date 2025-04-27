import { Router } from "express";
import { createProductController } from "../controllers/product.controllers";

const productRoutes = Router();

productRoutes.post(`/create`, createProductController);

export default productRoutes;
