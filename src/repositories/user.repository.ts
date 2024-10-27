import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { UserI } from "../models/user.model";

export class UserRepository {
    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection('users');
    }
    async getAll(): Promise<Array<UserI>> {
        const snapshot = await this.collection.get();

        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as Array<UserI>;
    }

    async getById(id: string): Promise<UserI | null> {
        const doc = await this.collection.doc(id).get();

        return doc.exists ? {
                id: doc.id,
                ...doc.data()
            } as UserI : null;
    }

    async save(user: UserI): Promise<void> {
        await this.collection.add(user);
    }

    async update(user: UserI): Promise<void | null> {
        let docRef = this.collection.doc(user.id as string);

        await docRef.set({
            nome: user.nome,
            email: user.email
        })
    }

    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }
}