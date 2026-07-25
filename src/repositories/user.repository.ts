import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";

export class UserRepository {
  private get collection() {
    return getFirestore().collection("users");
  }

  async getAll(): Promise<User[]> {
    const snapshot = await this.collection.get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as User[];
  }

  async getById(id: string): Promise<User | null> {
    const doc = await this.collection.doc(id).get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data()
    } as User;
  }

  async create(user: User): Promise<void> {
    await this.collection.add(user);
  }

  async update(id: string, user: User): Promise<void> {
    await this.collection.doc(id).set({
      nome: user.nome,
      email: user.email
    });
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
