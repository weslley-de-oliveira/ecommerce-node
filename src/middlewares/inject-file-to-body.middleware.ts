import { Request, Response, NextFunction } from "express";

export function injectFileToBody(paramName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      // Injeta o nome do arquivo gerado pelo Multer no req.body
      req.body[paramName] = req.file.filename;
    }
    next();
  };
}
