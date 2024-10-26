import {Request, Response} from 'express'
import { UserI } from '../interfaces/user.interface';

let usuarios: Array<UserI> = [];
let id = 0;

export class UserController {
    static getAll(req: Request, res: Response) {
        res.send(usuarios);
    }

     static getById(req: Request, res: Response) {
        let userId = parseInt(req.params.id);
        let user = usuarios.find((user) => user.id === userId)

        res.send(user);
    }

    static save(req: Request, res: Response) {
        let user = req.body;
        user.id = ++ id;
        usuarios.push(user);

        res.send({
            message: "Usuário criado com sucesso!"
        });
    }

    static update(req: Request, res: Response) {
        let userId = parseInt(req.params.id);
        let user = req.body;
        let indexOf = usuarios.findIndex((user) => user.id === userId);
        usuarios[indexOf].nome = user.nome;
        usuarios[indexOf].email = user.email;

        res.send("Dados atualizados com sucesso!");
    }

    static delete(req: Request, res: Response) {
        let userId = parseInt(req.params.id);
        usuarios = usuarios.filter((user) => user.id !== userId);

        res.send("Usuário removido com sucesso!");
    }
}