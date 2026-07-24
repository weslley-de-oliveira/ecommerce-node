import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";

let usuarios: { id: number; nome: string; email: string }[] = [];

export class UsersController {
  static getAll(req: Request, res: Response) {
    res.send(usuarios);
  }

  static getById(req: Request, res: Response) {
    let userId = Number(req.params.id);
    let user = usuarios.find((user) => user.id === userId);

    res.send(user);
  }

  static async create(req: Request, res: Response) {
    let user = req.body;
    await getFirestore().collection("users").add(user);

    res.send({
      message: `Usuário criado com sucesso!`,
    });
  }

  static update(req: Request, res: Response) {
    let user = req.body;
    let userId = Number(req.params.id);
    const index = usuarios.findIndex((user) => user.id === userId);

    usuarios[index] = { ...user, id: userId };

    res.send(usuarios);
  }

  static delete(req: Request, res: Response) {
    let userId = Number(req.params.id);
    const newUsuarios = usuarios.filter((user) => user.id !== userId);

    res.send(newUsuarios);
  }
}
