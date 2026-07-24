import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";

let usuarios: { id: number; nome: string; email: string }[] = [];

export class UsersController {
  static async getAll(req: Request, res: Response) {
    const snapshot = await getFirestore().collection("users").get();
    const users = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    res.send(users);
  }

  static async getById(req: Request, res: Response) {
    let userId = req.params.id as string;
    const doc = await getFirestore().collection("users").doc(userId).get();
    const user = { id: doc.id, ...doc.data() };

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
