import { Request, Response } from "express";
import { CompanyService } from "../services/company.service";
import { Company } from "../models/company.model";

const companyService = new CompanyService();

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

    await companyService.create(company);

    res.status(201).send({
      message: "Empresa criada com sucesso!"
    });
  }

  static async update(req: Request, res: Response) {
    const company = req.body as Company;
    const id = req.params.id as string;

    await companyService.update(company, id);

    res.send({
      message: "Empresa alterada com sucesso!"
    });
  }
}
