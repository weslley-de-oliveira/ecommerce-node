import { NotFoundError } from "../errors/not-found.erro";
import { Company } from "../models/company.model";
import { CompanyRepository } from "../repositories/company.repository";
import S3Storage from "../utils/s3.storage";

export class CompanyService {
  private _repository: CompanyRepository;
  private _s3Storage: S3Storage;

  constructor() {
    this._repository = new CompanyRepository();
    this._s3Storage = new S3Storage();
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

  async update(
    company: Company,
    id: string,
    file: Express.Multer.File | undefined = undefined
  ) {
    let _company = await this.getById(id);

    _company = { ...company, id: id, file: _company.file };

    if (file) {
      await this._s3Storage.saveFile(file, "companies");
      await this._s3Storage.deleteFile(_company.file, "companies");

      _company.file = file.filename;
    }

    await this._repository.update(_company);
  }
}
