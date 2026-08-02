import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { CompanyController } from "../controllers/company.controller";
import { newCompanySchema, updateCompanySchema } from "../models/company.model";
import { upload } from "../middlewares/upload.middleware";
import { injectFileToBody } from "../middlewares/inject-file-to-body.middleware";
import { validateBody } from "../middlewares/validate-body";

export const companyRoutes = Router();

companyRoutes.get("/companies", asyncHandler(CompanyController.getAll));
companyRoutes.get("/companies/:id", asyncHandler(CompanyController.getById));
companyRoutes.post(
  "/companies",
  upload("companies"),
  injectFileToBody("file"),
  validateBody(newCompanySchema),
  CompanyController.create
);
companyRoutes.put(
  "/companies/:id",
  upload("companies"),
  injectFileToBody("file"),
  validateBody(newCompanySchema),
  celebrate({
    [Segments.BODY]: updateCompanySchema
  }),
  asyncHandler(CompanyController.update)
);
