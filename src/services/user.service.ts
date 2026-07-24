import { getFirestore } from "firebase-admin/firestore";
import { NotFoundError } from "../errors/not-found.erro";
import { User } from "../models/user.model";

export class UserService {
  async getAll(): Promise<User[]> {
    const snapshot = await getFirestore().collection("users").get();

    return snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    }) as User[];
  }

  async getById(id: string): Promise<User> {
    const doc = await getFirestore().collection("users").doc(id).get();

    if (!doc.exists) {
      throw new NotFoundError();
    }

    return { id: doc.id, ...doc.data() } as User;
  }

  async create(user: User) {
    await getFirestore().collection("users").add(user);
  }

  async update(user: User, id: string) {
    const docRef = getFirestore().collection("users").doc(id);

    if (!(await docRef.get()).exists) {
      throw new NotFoundError();
    }

    await docRef.set({
      nome: user.nome,
      email: user.email
    });
  }

  async delete(id: string) {
    const docRef = getFirestore().collection("users").doc(id);

    if (!(await docRef.get()).exists) {
      throw new NotFoundError();
    }

    await docRef.delete();
  }
}
