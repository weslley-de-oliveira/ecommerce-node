import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { CompanyController } from "../controllers/company.controller";
import { newCompanySchema, updateCompanySchema } from "../models/company.model";

// Módulo do Express pra criação e configuração de Rotas
export const companyRoutes = Router();

companyRoutes.get("/companies", asyncHandler(CompanyController.getAll));
companyRoutes.get("/companies/:id", asyncHandler(CompanyController.getById));
companyRoutes.post(
  "/companies",
  celebrate({
    [Segments.BODY]: newCompanySchema
  }),
  asyncHandler(CompanyController.create)
);
companyRoutes.put(
  "/companies/:id",
  celebrate({
    [Segments.BODY]: updateCompanySchema
  }),
  asyncHandler(CompanyController.update)
);
