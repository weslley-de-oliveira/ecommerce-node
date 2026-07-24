import { NextFunction, Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { NotFoundError } from "../errors/not-found.erro";
import { ValidationError } from "../errors/validation.error";

export class UsersController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const snapshot = await getFirestore().collection("users").get();
    const users = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    res.send(users);
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id as string;
    const doc = await getFirestore().collection("users").doc(userId).get();

    if (!doc.exists) {
      throw new NotFoundError();
    }

    res.send({ id: doc.id, ...doc.data() });
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const user = req.body;

    await getFirestore().collection("users").add(user);

    res.status(201).send({
      message: "Usuário criado com sucesso!"
    });
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const user = req.body;
    const userId = req.params.id as string;
    const docRef = getFirestore().collection("users").doc(userId);

    if (!user.email || !user.email?.length) {
      throw new ValidationError("E-mail obrigatório!");
    }

    if (!user.nome || !user.nome?.length) {
      throw new ValidationError("Nome obrigatório!");
    }

    if (!(await docRef.get()).exists) {
      throw new NotFoundError();
    }

    await docRef.set({
      nome: user.nome,
      email: user.email
    });

    res.send({
      message: "Usuário alterado  com sucesso!"
    });
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id as string;
    const docRef = getFirestore().collection("users").doc(userId);

    if (!(await docRef.get()).exists) {
      throw new NotFoundError();
    }
    await docRef.delete();

    res.send({
      message: "Usuário excluído com scesso!"
    });
  }
}
