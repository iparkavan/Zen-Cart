import { Router } from "express";
import { getCurrentUserController } from "../controllers/user.controllers";

const userRoutes = Router();

userRoutes.get(`/current-user`, getCurrentUserController);

export default userRoutes;
