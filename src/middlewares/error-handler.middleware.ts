import { errors } from "celebrate";
import express, { NextFunction, Request, Response } from "express";
import { InternalServerError } from "../errors/internal-serve-error";
import { NotFoundError } from "../errors/not-found.erro";
import { ValidationError } from "../errors/validation.error";

export const errorHandler = (app: express.Express) => {
  app.use(errors());
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      error.send(res);
      return;
    }

    new InternalServerError().send(res);
  });
};
