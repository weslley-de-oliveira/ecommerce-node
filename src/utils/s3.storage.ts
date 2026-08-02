import { S3 } from "aws-sdk";
import fs from "fs";
import { NotFoundError } from "../errors/not-found.erro";

class S3Storage {
  private _client: S3;

  constructor() {
    this._client = new S3({
      region: "us-east-2"
    });
  }

  async saveFile(file: Express.Multer.File, folder: string): Promise<string> {
    if (!fs.existsSync(file.path)) {
      throw new NotFoundError("Arquivo não encontrado no servidor.");
    }

    const fileContent = await fs.promises.readFile(file.path);
    const fileKey = `${folder}/${file.filename}`;

    await this._client
      .putObject({
        Bucket: "ecommerce-node",
        Key: fileKey,
        ACL: "public-read",
        Body: fileContent,
        ContentType: file.mimetype // O próprio Multer já nos dá o MIME Type exato (image/png, etc.)
      })
      .promise();

    // 5. Deleta o arquivo local temporário após concluir o upload para o S3
    await fs.promises.unlink(file.path);

    // Retorna o caminho salvo para ser persistido no Banco de Dados
    return fileKey;
  }

  async deleteFile(fileName: string, folder: string) {
    const fileKey = `${folder}/${fileName}`;

    await this._client
      .deleteObject({
        Bucket: "ecommerce-node",
        Key: fileKey
      })
      .promise();
  }
}

export default S3Storage;
