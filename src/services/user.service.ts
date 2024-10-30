import { NotFoundError } from "../errors/not-found.error";
import { UserI } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";

export class UserService {
    private userRepository: UserRepository;
    private authService: AuthService;

    constructor() {
        this.userRepository = new UserRepository();
        this.authService = new AuthService();
    }

    async getAll(): Promise<Array<UserI>> {
        return this.userRepository.getAll();
    }

    async getById(id: string): Promise<UserI> {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new NotFoundError("Usuário não encontrado!");
        }
        
        return user;
    }

    async save(user: UserI): Promise<void> {
        const userAuth = await this.authService.create(user);
        user.id = userAuth.uid;
        this.userRepository.update(user);
    }

    async update(id: string, user: UserI): Promise<void> {
        const _user = await this.userRepository.getById(id);

        if (!_user) {
            throw new NotFoundError("Usuário não encontrado!")
        }

        _user.nome = user.nome;
        _user.email = user.email;

        await this.authService.update(id, user);
        await this.userRepository.update(_user);
    }

    async delete(id: string): Promise<void> {
        this.userRepository.delete(id);
    }
}