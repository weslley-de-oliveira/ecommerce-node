import { Request, Response } from "express";
import { CompanyService } from "../services/company.service";
import { Company } from "../models/company.model";
import S3Storage from "../utils/s3.storage";

const companyService = new CompanyService();
const s3Storage = new S3Storage();

export class CompanyController {
  static async getAll(req: Request, res: Response) {
    res.send(await companyService.getAll());
  }

  static async getById(req: Request, res: Response) {
    const id = req.params.id as string;

    res.send(await companyService.getById(id));
  }

  static async create(req: Request, res: Response) {
    const company = req.body as Company;
    const file = req.file;

    if (!file) return;

    await s3Storage.saveFile(file, "companies");
    await companyService.create(company);

    res.status(201).send({
      message: "Empresa criada com sucesso!"
    });
  }

  static async update(req: Request, res: Response) {
    const company = req.body as Company;
    const id = req.params.id as string;
    const file = req.file;

    await companyService.update(company, id, file);

    res.send({
      message: "Empresa alterada com sucesso!"
    });
  }
}
