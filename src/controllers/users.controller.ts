import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";

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

  static async update(req: Request, res: Response) {
    let user = req.body;
    let userId = req.params.id as string;

    await getFirestore().collection("users").doc(userId).set({
      nome: user.nome,
      email: user.email,
    });

    res.send({
      message: "Usuário altera com sucesso!",
    });
  }

  static async delete(req: Request, res: Response) {
    let userId = req.params.id as string;
    await getFirestore().collection("users").doc(userId).delete();

    res.send({
      message: "Usuário excluído com scesso!",
    });
  }
}
