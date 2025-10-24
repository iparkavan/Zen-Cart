import { Router } from "express";
import {
  getAllCategoryController,
  getCategoryByIdController,
  getFilterByCategoryController,
} from "../controllers/category.controller";

const categoryRoutes = Router();

categoryRoutes.get(`/all`, getAllCategoryController);

categoryRoutes.get(`/`, getFilterByCategoryController);

categoryRoutes.get(`/filter/:categoryId`, getCategoryByIdController);

export default categoryRoutes;
