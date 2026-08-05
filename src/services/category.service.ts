import { NotFoundError } from "../errors/not-found.erro";
import { Category } from "../models/category.model";
import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {
  private _repository: CategoryRepository;

  constructor() {
    this._repository = new CategoryRepository();
  }

  async getAll() {
    return this._repository.getAll();
  }

  async getById(id: string) {
    const category = await this._repository.getById(id);

    if (!category) {
      throw new NotFoundError();
    }

    return category;
  }

  async create(category: Category) {
    await this._repository.create(category);
  }

  async update(category: Category, id: string) {
    let _category = await this.getById(id);

    _category = { ...category, id: id };

    await this._repository.update(_category);
  }

  async delete(id: string) {
    const _category = await this._repository.getById(id);

    if (!_category) {
      throw new NotFoundError();
    }

    await this._repository.delete(id);
  }
}
