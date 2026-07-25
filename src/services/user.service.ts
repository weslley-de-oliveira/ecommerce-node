import { NotFoundError } from "../errors/not-found.erro";
import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  constructor(private readonly _repository = new UserRepository()) {}

  async getAll() {
    return this._repository.getAll();
  }

  async getById(id: string) {
    const user = await this._repository.getById(id);

    if (!user) {
      throw new NotFoundError();
    }

    return user;
  }

  async create(user: User) {
    await this._repository.create(user);
  }

  async update(user: User, id: string) {
    const existing = await this._repository.getById(id);

    if (!existing) {
      throw new NotFoundError();
    }

    await this._repository.update(id, user);
  }

  async delete(id: string) {
    const existing = await this._repository.getById(id);

    if (!existing) {
      throw new NotFoundError();
    }

    await this._repository.delete(id);
  }
}
