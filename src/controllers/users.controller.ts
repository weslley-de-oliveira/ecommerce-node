import { Request, Response  } from 'express';
import { getFirestore } from 'firebase-admin/firestore';

export class UserController {
    static async getAll(req: Request, res: Response) {
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
            res.status(500).send({
                message: "Erro interno do servidor."
            });
        }
    }

     static async getById(req: Request, res: Response) {
        try {
            let userId = req.params.id;
            const doc = await getFirestore().collection('users').doc(userId).get();
            let user = {
                id: doc.id,
                ...doc.data()
            }

            res.send(user);
        }
        catch (error) {
            res.status(500).send({
                message: "Erro interno do servidor."
            });
        }
    }

    static async save(req: Request, res: Response) {
        try {
            let user = req.body;
            await getFirestore().collection('users').add(user);

            res.status(201).send({
                message: "Usuário criado com sucesso!"
            });
        } 
        catch (error) {
            res.status(500).send({
                message: "Erro interno do servidor."
            });
        }
    }

    static update(req: Request, res: Response) {
        try {
            let userId = req.params.id;
            let user = req.body;

            getFirestore().collection('users').doc(userId).set({
                nome: user.nome,
                email: user.email
            });

            res.send("Dados atualizados com sucesso!");
        } 
        catch (error) {
            res.status(500).send({
                message: "Erro interno do servidor."
            });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            let userId = req.params.id;
            await getFirestore().collection('users').doc(userId).delete();

            res.status(204).end();
        } catch (error) {
            res.status(500).send({
                message: "Erro interno do servidor."
            });
        }
    }
}