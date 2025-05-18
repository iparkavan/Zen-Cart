import { Router } from "express";
import { getCategoryByIdController } from "../controllers/category.controller";

const categoryRoutes = Router();

categoryRoutes.get(`/filter/:categoryId`, getCategoryByIdController);

export default categoryRoutes;
