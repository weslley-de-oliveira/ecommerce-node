import { Request, Response } from "express";
import { Category } from "../models/category.model";
import { CategoryService } from "../services/category.service";

const categoryService = new CategoryService();

export class CategoryController {
  static async getAll(req: Request, res: Response) {
    res.send(await categoryService.getAll());
  }

  static async getById(req: Request, res: Response) {
    const id = req.params.id as string;

    res.send(await categoryService.getById(id));
  }

  static async create(req: Request, res: Response) {
    const category = req.body as Category;
    await categoryService.create(category);

    res.status(201).send({
      message: "Categoria criada com sucesso!"
    });
  }

  static async update(req: Request, res: Response) {
    const category = req.body as Category;
    const id = req.params.id as string;

    await categoryService.update(category, id);

    res.send({
      message: "Categoria alterada com sucesso!"
    });
  }

  static async delete(req: Request, res: Response) {
    const id = req.params.id as string;

    await categoryService.delete(id);

    res.send({
      message: "Categoria excluída com scesso!"
    });
  }
}
