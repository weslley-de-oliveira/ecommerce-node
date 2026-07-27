import { errors } from "celebrate";
import express, { NextFunction, Request, Response } from "express";
import { InternalServerError } from "../errors/internal-serve-error";
import { ErrorBase } from "../errors/error-base";

export const errorHandler = (app: express.Express) => {
  app.use(errors());
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ErrorBase) {
      error.send(res);
      return;
    }

    console.log(error);

    new InternalServerError().send(res);
  });
};
