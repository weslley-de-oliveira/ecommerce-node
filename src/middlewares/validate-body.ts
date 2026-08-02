import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { Schema } from "joi";

export function validateBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      if (req.file) {
        fs.unlink(req.file.path, () => {});
      }

      return res.status(400).json({
        message: "Erro de validação nos dados enviados.",
        details: error.details.map((d) => d.message)
      });
    }

    req.body = value;
    return next();
  };
}
