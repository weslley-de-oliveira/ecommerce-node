import { NextFunction, Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { ValidationError } from "../errors/validation.error";

export class UsersController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const snapshot = await getFirestore().collection("users").get();
      const users = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      res.send(users);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = req.params.id as string;
      const doc = await getFirestore().collection("users").doc(userId).get();
      const user = { id: doc.id, ...doc.data() };

      res.send(user);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      let user = req.body;

      if (!user.email || !user.email?.length) {
        throw new ValidationError("E-mail obrigatório!");
      }

      if (!user.nome || !user.nome?.length) {
        throw new ValidationError("Nome obrigatório!");
      }

      await getFirestore().collection("users").add(user);

      res.status(201).send({
        message: `Usuário criado com sucesso!`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      let user = req.body;
      let userId = req.params.id as string;

      await getFirestore().collection("users").doc(userId).set({
        nome: user.nome,
        email: user.email,
      });

      res.send({
        message: "Usuário alterado  com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = req.params.id as string;
      await getFirestore().collection("users").doc(userId).delete();

      res.send({
        message: "Usuário excluído com scesso!",
      });
    } catch (error) {
      next(error);
    }
  }
}
