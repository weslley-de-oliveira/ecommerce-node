import { createUpload } from "../configs/multer";

export function upload(folder: string) {
  return createUpload(folder).single("file");
}
