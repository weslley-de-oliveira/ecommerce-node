import { Router } from 'express';
import { UserController } from '../controllers/users.controller';
import asyncHandler  from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { createUserSchema, updateUserSchema } from '../models/user.model';

export const userRoutes = Router();

userRoutes.get("/users",asyncHandler( UserController.getAll));
userRoutes.get("/users/:id", asyncHandler(UserController.getById));
userRoutes.post("/users", celebrate({[Segments.BODY] : createUserSchema}), asyncHandler(UserController.save));
userRoutes.put("/users/:id", celebrate({[Segments.BODY] : updateUserSchema}), asyncHandler(UserController.update));
userRoutes.delete("/users/:id", asyncHandler(UserController.delete));