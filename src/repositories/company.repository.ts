import { getFirestore } from "firebase-admin/firestore";
import { Company } from "../models/company.model";

export class CompanyRepository {
  private get collection() {
    return getFirestore().collection("companies");
  }

  async getAll(): Promise<Company[]> {
    const snapshot = await this.collection.get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Company[];
  }

  async getById(id: string): Promise<Company | null> {
    const doc = await this.collection.doc(id).get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data()
    } as Company;
  }

  async create(company: Company) {
    await this.collection.add(company);
  }

  async update(company: Company) {
    let docRef = this.collection.doc(company.id!);

    delete company.id;

    await docRef.set(company);
  }
}
