import express, { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/unauthorized.erro";
import { getAuth } from "firebase-admin/auth";
import { UserService } from "../services/user.service";
import { ForbiddenError } from "../errors/forbidden.erro";

export const auth = (app: express.Express) => {
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "POST" && req.url.startsWith("/auth/login")) {
      return next();
    }

    const token = req.headers.authorization?.split("Bearer ")[1];

    if (token) {
      console.log(token);
      try {
        const decodeIdToken = await getAuth().verifyIdToken(token, true);
        const user = await new UserService().getById(decodeIdToken.uid);

        if (!user) {
          console.log("Não tem user");
          return next(new ForbiddenError());
        }

        console.log("Tem user");
        req.user = user;

        return next();
      } catch (error) {
        next(new UnauthorizedError());
      }
    }

    next(new UnauthorizedError());
  });
};
