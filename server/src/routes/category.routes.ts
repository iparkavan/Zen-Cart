import { Router } from "express";
import {
  getAllCategoryController,
  getCategoryByIdController,
} from "../controllers/category.controller";

const categoryRoutes = Router();

categoryRoutes.get(`/all`, getAllCategoryController);

categoryRoutes.get(`/filter/:categoryId`, getCategoryByIdController);

export default categoryRoutes;
