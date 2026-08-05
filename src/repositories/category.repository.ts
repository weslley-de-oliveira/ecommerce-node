import { getFirestore } from "firebase-admin/firestore";
import { Category } from "../models/category.model";

export class CategoryRepository {
  private get collection() {
    return getFirestore().collection("categories");
  }

  async getAll(): Promise<Category[]> {
    const snapshot = await this.collection.get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Category[];
  }

  async getById(id: string): Promise<Category | null> {
    const doc = await this.collection.doc(id).get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data()
    } as Category;
  }

  async create(category: Category) {
    await this.collection.add(category);
  }

  async update(category: Category) {
    let docRef = this.collection.doc(category.id!);

    delete category.id;

    await docRef.set(category);
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
