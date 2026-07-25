import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { authSchema } from "../models/auth.model";
import { AuthController } from "../controllers/auth.controller";

// Módulo do Express pra criação e configuração de Rotas
export const authRoutes = Router();

authRoutes.post(
  "/auth/login",
  celebrate({
    [Segments.BODY]: authSchema
  }),
  asyncHandler(AuthController.login)
);
