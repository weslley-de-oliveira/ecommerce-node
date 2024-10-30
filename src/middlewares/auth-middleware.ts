import express, { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { getAuth } from 'firebase-admin/auth';
import { UserService } from '../services/user.service';
import { ForbiddenError } from '../errors/forbbiden.error';

export const auth = (app: express.Express) => {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        if (req.method === 'POST' && req.url.endsWith('/auth/login')) {
            return next();
        }

        const token = req.headers.authorization?.split("Bearer ")[1];

        if (token) {
            try {
                const decodeIdToken = await getAuth().verifyIdToken(token, true);

                const user = await new UserService().getById(decodeIdToken.uid);

                if (!user) {
                    return next(new ForbiddenError());
                }

                req.user = user;

                return next();
            } catch (error) {
                return next(new UnauthorizedError());            }
        }

        return next(new UnauthorizedError());
    });
}