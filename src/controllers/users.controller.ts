import { Request, Response  } from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import { UserI } from '../interfaces/user.interface';

let usuarios: Array<UserI> = [];

export class UserController {
    static getAll(req: Request, res: Response) {
        res.send(usuarios);
    }

     static getById(req: Request, res: Response) {
        let userId = parseInt(req.params.id);
        let user = usuarios.find((user) => user.id === userId)

        res.send(user);
    }

    static async save(req: Request, res: Response) {
        let user = req.body;
        await getFirestore().collection('users').add(user);

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