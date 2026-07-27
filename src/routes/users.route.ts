import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { UserController } from "../controllers/user.controller";
import { newUserSchema, updateUserSchema } from "../models/user.model";

// Módulo do Express pra criação e configuração de Rotas
export const userRoutes = Router();

userRoutes.get("/users", asyncHandler(UserController.getAll));
userRoutes.get("/users/:id", asyncHandler(UserController.getById));
userRoutes.post(
  "/users",
  celebrate({
    [Segments.BODY]: newUserSchema
  }),
  asyncHandler(UserController.create)
);
userRoutes.put(
  "/users/:id",
  celebrate({
    [Segments.BODY]: updateUserSchema
  }),
  asyncHandler(UserController.update)
);
userRoutes.delete("/users/:id", asyncHandler(UserController.delete));
