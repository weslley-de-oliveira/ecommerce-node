import { Request, Response } from "express";
import { AuthT } from "../models/auth.model";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  static async login(req: Request, res: Response) {
    const auth = req.body as AuthT;
    const userRecord = await authService.login(auth);
    const token = await userRecord.user.getIdToken(true);

    res.send({
      token: token
    });
  }

  static async recovery(req: Request, res: Response) {
    const { email } = req.body;
    await authService.recovery(email);

    res.end();
  }
}
