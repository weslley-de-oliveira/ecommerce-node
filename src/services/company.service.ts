import { NotFoundError } from "../errors/not-found.erro";
import { Company } from "../models/company.model";
import { CompanyRepository } from "../repositories/company.repository";

export class CompanyService {
  private _repository: CompanyRepository;

  constructor() {
    this._repository = new CompanyRepository();
  }

  async getAll() {
    return this._repository.getAll();
  }

  async getById(id: string) {
    const company = await this._repository.getById(id);

    if (!company) {
      throw new NotFoundError();
    }

    return company;
  }

  async create(company: Company) {
    await this._repository.create(company);
  }

  async update(company: Company, id: string) {
    let _company = await this._repository.getById(id);

    if (!_company) {
      throw new NotFoundError();
    }

    _company = { ...company, id: id };

    await this._repository.update(_company);
  }
}
