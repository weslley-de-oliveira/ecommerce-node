import express, { NextFunction, Request, Response } from "express";
import { InternalServerError } from "../errors/internal-serve-error";
import { ValidationError } from "../errors/validation.error";

export const errorHandler = (app: express.Express) => {
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error instanceof ValidationError);
    if (error instanceof ValidationError) {
      error.send(res);
    } else {
      new InternalServerError().send(res);
    }
  });
};
