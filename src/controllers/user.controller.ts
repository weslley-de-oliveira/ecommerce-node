import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    res.send(await userService.getAll());
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as string;

    res.send(await userService.getById(id));
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const user = req.body as User;

    await userService.create(user);

    res.status(201).send({
      message: "Usuário criado com sucesso!"
    });
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const user = req.body as User;
    const id = req.params.id as string;

    await userService.update(user, id);

    res.send({
      message: "Usuário alterado  com sucesso!"
    });
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as string;

    await userService.delete(id);

    res.send({
      message: "Usuário excluído com scesso!"
    });
  }
}
