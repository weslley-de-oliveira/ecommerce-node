import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand
} from "@aws-sdk/client-s3";
import fs from "fs";
import { NotFoundError } from "../errors/not-found.erro";

class S3Storage {
  private _client: S3Client;

  constructor() {
    this._client = new S3Client({
      region: "us-east-2"
    });
  }

  async saveFile(file: Express.Multer.File, folder: string): Promise<string> {
    if (!fs.existsSync(file.path)) {
      throw new NotFoundError("Arquivo não encontrado no servidor.");
    }

    const fileContent = await fs.promises.readFile(file.path);
    const fileKey = `${folder}/${file.filename}`;

    await this._client.send(
      new PutObjectCommand({
        Bucket: "ecommerce-node",
        Key: fileKey,
        Body: fileContent,
        ContentType: file.mimetype,
        ACL: "public-read"
      })
    );

    await fs.promises.unlink(file.path);

    return fileKey;
  }

  async deleteFile(fileName: string, folder: string): Promise<void> {
    const fileKey = `${folder}/${fileName}`;

    await this._client.send(
      new DeleteObjectCommand({
        Bucket: "ecommerce-node",
        Key: fileKey
      })
    );
  }
}

export default S3Storage;
