import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { CategoryController } from "../controllers/category.controller";
import {
  newCategorySchema,
  updateCategorySchema
} from "../models/category.model";

export const categoryRoutes = Router();

categoryRoutes.get("/categories", asyncHandler(CategoryController.getAll));
categoryRoutes.get("/categories/:id", asyncHandler(CategoryController.getById));
categoryRoutes.post(
  "/categories",
  celebrate({
    [Segments.BODY]: newCategorySchema
  }),
  CategoryController.create
);
categoryRoutes.put(
  "/categories/:id",
  celebrate({
    [Segments.BODY]: updateCategorySchema
  }),
  asyncHandler(CategoryController.update)
);
categoryRoutes.delete(
  "/categories/:id",
  asyncHandler(CategoryController.delete)
);
