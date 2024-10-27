import { NextFunction, Request, Response  } from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import { ValidationError } from '../errors/validation.error';
import { NotFoundError } from '../errors/not-found.error';

export class UserController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const snapshot = await getFirestore().collection('users').get();
            const users = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });

            res.send(users);
        }
        catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        const doc = await getFirestore().collection('users').doc(userId).get();
        if (doc.exists) {
            let user = {
                id: doc.id,
                ...doc.data()
            }

            res.send(user);
        } else {
            throw new NotFoundError("Usuário não encontrado!");
        }
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        let user = req.body;

        if (!user.email || !user.email?.length) {
            throw new ValidationError("Email obrigatório!");
        }
        
        await getFirestore().collection('users').add(user);

        res.status(201).send({
            message: "Usuário criado com sucesso!"
        });
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        let user = req.body;
        let docRef = getFirestore().collection('users').doc(userId);

        if ((await docRef.get()).exists) {
                await docRef.set({
                nome: user.nome,
                email: user.email
            });

                res.send("Dados atualizados com sucesso!");
        } else {
            throw new NotFoundError("Usuário não encontrado!")
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        await getFirestore().collection('users').doc(userId).delete();

        res.status(204).end();
    }
}