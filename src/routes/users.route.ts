import { celebrate, Segments } from "celebrate";
import express from "express";
import asyncHandler from "express-async-handler";
import { UsersController } from "../controllers/users.controller";
import { userSchema } from "../models/user.model";

// Módulo do Express pra criação e configuração de Rotas
export const userRoutes = express.Router();

userRoutes.get("/users", asyncHandler(UsersController.getAll));
userRoutes.get("/users/:id", asyncHandler(UsersController.getById));
userRoutes.post(
  "/users",
  celebrate({
    [Segments.BODY]: userSchema
  }),
  asyncHandler(UsersController.create)
);
userRoutes.put(
  "/users/:id",
  celebrate({
    [Segments.BODY]: userSchema
  }),
  asyncHandler(UsersController.update)
);
userRoutes.delete("/users/:id", asyncHandler(UsersController.delete));
