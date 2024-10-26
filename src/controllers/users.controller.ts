import { Request, Response  } from 'express';
import { getFirestore } from 'firebase-admin/firestore';

export class UserController {
    static async getAll(req: Request, res: Response) {
        const snapshot = await getFirestore().collection('users').get();
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });

        res.send(users);
    }

     static async getById(req: Request, res: Response) {
        let userId = req.params.id;
        const doc = await getFirestore().collection('users').doc(userId).get();
        let user = {
            id: doc.id,
            ...doc.data()
        }

        res.send(user);
    }

    static async save(req: Request, res: Response) {
        let user = req.body;
        await getFirestore().collection('users').add(user);

        res.send({
            message: "Usuário criado com sucesso!"
        });
    }

    static update(req: Request, res: Response) {
        let userId = req.params.id;
        let user = req.body;

        getFirestore().collection('users').doc(userId).set({
            nome: user.nome,
            email: user.email
        });

        res.send("Dados atualizados com sucesso!");
    }

    static async delete(req: Request, res: Response) {
        let userId = req.params.id;

        await getFirestore().collection('users').doc(userId).delete();

        res.send("Usuário removido com sucesso!");
    }
}