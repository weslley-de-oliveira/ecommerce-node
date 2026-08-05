import { NotFoundError } from "../errors/not-found.erro";
import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";

export class UserService {
  private _repository: UserRepository;
  private _authService: AuthService;

  constructor() {
    this._repository = new UserRepository();
    this._authService = new AuthService();
  }

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
    const userAuth = await this._authService.create(user);
    user.id = userAuth.uid;
    await this._repository.update(user);
  }

  async update(user: User, id: string) {
    let _user = await this.getById(id);

    _user.nome = user.nome;
    _user.email = user.email;

    await this._authService.update(id, user);
    await this._repository.update(_user);
  }

  async delete(id: string) {
    const _user = await this._repository.getById(id);

    if (!_user) {
      throw new NotFoundError();
    }

    await this._authService.delete(id);
    await this._repository.delete(id);
  }
}
