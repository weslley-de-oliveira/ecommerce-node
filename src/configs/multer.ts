// config/multer.ts

import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

export function getPathMulter(folder: string): string {
  return path.resolve(__dirname, "../../uploads", folder);
}

export function createUpload(folder: string) {
  return multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        const uploadPath = getPathMulter(folder);

        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
      },
      filename(req, file, cb) {
        const hash = crypto.randomBytes(8).toString("hex");

        cb(null, `${hash}-${Date.now()}${path.extname(file.originalname)}`);
      }
    }),
    limits: {
      fileSize: 5 * 1024 * 1024 //5MB
    },
    fileFilter(req, file, cb) {
      const allowed = ["image/png", "image/jpeg", "image/webp"];

      if (!allowed.includes(file.mimetype)) {
        return cb(new Error("Arquivo inválido"));
      }

      cb(null, true);
    }
  });
}
