import express, {Request, Response} from 'express';
import { UserI } from '../interfaces/user.interface';

export const userRoutes = express.Router();
let usuarios: Array<UserI> = [];
let id = 0;

userRoutes.get("/users", (req: Request, res: Response) => {
    res.send(usuarios);
});

userRoutes.get("/users/:id", (req: Request, res: Response) => {
    let userId = parseInt(req.params.id);
    let user = usuarios.find((user) => user.id === userId)
    res.send(user);
});

userRoutes.post("/users", (req: Request, res: Response) => {
    let user = req.body;
    user.id = ++ id;
    usuarios.push(user);
    res.send({
        message: "Usuário criado com sucesso!"
    });
});

userRoutes.put("/users/:id", (req: Request, res: Response) => {
    let userId = parseInt(req.params.id);
    let user = req.body;
    let indexOf = usuarios.findIndex((user) => user.id === userId);
    usuarios[indexOf].nome = user.nome;
    usuarios[indexOf].email = user.email;
    res.send("Dados atualizados com sucesso!");
});

userRoutes.delete("/users/:id", (req: Request, res: Response) => {
    let userId = parseInt(req.params.id);
    usuarios = usuarios.filter((user) => user.id !== userId);

    res.send("Usuário removido com sucesso!");
});